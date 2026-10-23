import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Text,
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { IoFilter } from 'react-icons/io5'
import { BiSearch } from 'react-icons/bi'
import { FaCalendarAlt } from 'react-icons/fa'
import MainLayout from '../../DashboardLayout'
import Input from '../../Components/Input'
import TableRow from '../../Components/TableRow'
import Pagination from '../../Components/Pagination'
import Preloader from '../../Components/Preloader'
import ShowToast from '../../Components/ToastNotification'
import { GetAllScholarshipSchoolsApi, ApproveSchoolApi } from '../../Utils/ApiCall'
import { configuration } from '../../Utils/Helpers'

const PAGE_SIZE = configuration.sizePerPage

export default function Schools() {
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [loadingSchoolId, setLoadingSchoolId] = useState(null)

  // search + date filter (client-side, applies to the rows currently loaded)
  const [searchInput, setSearchInput] = useState('')
  const [byDate, setByDate] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // lists + totals from the API (totalItems)
  const [pendingSchools, setPendingSchools] = useState([])
  const [approvedSchools, setApprovedSchools] = useState([])
  const [rejectedSchools, setRejectedSchools] = useState([])

  const [totalPending, setTotalPending] = useState(0)
  const [totalApproved, setTotalApproved] = useState(0)
  const [totalRejected, setTotalRejected] = useState(0)

  const [pagePending, setPagePending] = useState(1)
  const [pageApproved, setPageApproved] = useState(1)
  const [pageRejected, setPageRejected] = useState(1)

  const totalSchools = totalPending + totalApproved + totalRejected

  // setters are stable, so this config is safe to use inside useCallback
  const statusConfig = useMemo(
    () => ({
      PENDING: { setList: setPendingSchools, setTotal: setTotalPending, setPage: setPagePending },
      APPROVED: { setList: setApprovedSchools, setTotal: setTotalApproved, setPage: setPageApproved },
      REJECTED: { setList: setRejectedSchools, setTotal: setTotalRejected, setPage: setPageRejected },
    }),
    []
  )

  const fetchSchools = useCallback(
    async (status, page) => {
      const { setList, setTotal, setPage } = statusConfig[status]
      try {
        const result = await GetAllScholarshipSchoolsApi(page, PAGE_SIZE, status)

        if (result.status === 200) {
          const schools = result.data.data?.schools || []
          const total = result.data.data?.totalItems || 0

          // current page became empty (e.g. last item was moved) -> go back one page
          if (schools.length === 0 && page > 1 && total > 0) {
            setPage(page - 1)
            return
          }

          setList(schools)
          setTotal(total)
        } else {
          setList([])
          setTotal(0)
        }
      } catch (e) {
        console.error(`Fetch ${status} schools error:`, e.message)
        setList([])
        setTotal(0)
      } finally {
        setIsLoading(false)
      }
    },
    [statusConfig]
  )

  useEffect(() => {
    fetchSchools('PENDING', pagePending)
  }, [pagePending, fetchSchools])

  useEffect(() => {
    fetchSchools('APPROVED', pageApproved)
  }, [pageApproved, fetchSchools])

  useEffect(() => {
    fetchSchools('REJECTED', pageRejected)
  }, [pageRejected, fetchSchools])

  const refreshAll = () => {
    fetchSchools('PENDING', pagePending)
    fetchSchools('APPROVED', pageApproved)
    fetchSchools('REJECTED', pageRejected)
  }

  const notify = (message, status) => {
    setShowToast({ show: true, message, status })
    setTimeout(() => setShowToast({ show: false, message: '', status: '' }), 3000)
  }

  const toggleSchoolStatus = async (item) => {
    setLoadingSchoolId(item.id)

    // PENDING -> APPROVED, APPROVED -> REJECTED, REJECTED -> APPROVED
    const newStatus = item.account_verified === 'APPROVED' ? 'REJECTED' : 'APPROVED'

    try {
      const result = await ApproveSchoolApi(item.id, newStatus, '')

      if (result.status === 200 || result.data?.status === 200 || result.data?.status === true) {
        notify(`School ${newStatus}`, newStatus === 'REJECTED' ? 'error' : 'success')
        refreshAll()
      }
    } catch (e) {
      notify(e.response?.data?.message || e.message || 'Error changing status!', 'error')
    } finally {
      setLoadingSchoolId(null)
    }
  }

  const applyFilters = (list) => {
    let rows = list

    const q = searchInput.trim().toLowerCase()
    if (q) {
      rows = rows.filter(
        (s) =>
          (s.school_name || '').toLowerCase().includes(q) ||
          (s.principal_email || '').toLowerCase().includes(q) ||
          (s.principal_fullname || '').toLowerCase().includes(q)
      )
    }

    if (byDate && startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      rows = rows.filter((s) => {
        const d = new Date(s.created_at)
        return d >= start && d <= end
      })
    }

    return rows
  }

  const clearFilters = () => {
    setSearchInput('')
    setByDate(false)
    setStartDate('')
    setEndDate('')
  }

  const tabStyle = {
    _selected: { color: 'green', borderColor: 'green' },
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    px: ['10px', '16px'],
  }

  const countBadge = (n) => (
    <Box as="span" color="#667085" fontSize="12px" fontWeight="600" ml="4px">
      ({n})
    </Box>
  )

  // one reusable table for all three tabs
  const renderTable = ({ list, emptyText, page, total, setPage }) => {
    const rows = applyFilters(list)
    return (
      <Box
        mt="12px"
        bg="#fff"
        border="2px solid #EFEFEF"
        py={['16px', '16px', '30px']}
        px={['8px', '8px', '18px']}
        rounded="10px"
      >
        <TableContainer overflowX="auto">
          <Table variant="simple">
            <Thead bg="#F9FAFB">
              <Tr>
                {['name', 'submission date', 'status', 'actions'].map((h) => (
                  <Th key={h} fontSize="13px" textTransform="capitalize" color="#2F2F2F" fontWeight="600">
                    {h}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {rows.length > 0 ? (
                rows.map((item) => (
                  <TableRow
                    key={item.id}
                    type={'scholarship-admin-schools'}
                    schoolId={item.id}
                    schoolName={item.school_name}
                    school_logo={item.school_logo}
                    email={item.principal_email}
                    submissionDate={item.created_at}
                    status={item.account_verified}
                    loading={loadingSchoolId === item.id}
                    buttonText={
                      item.account_verified === 'PENDING'
                        ? 'Approve'
                        : item.account_verified === 'APPROVED'
                        ? 'Reject'
                        : item.account_verified === 'REJECTED'
                        ? 'Unreject'
                        : 'Reject'
                    }
                    onButtonClick={() => toggleSchoolStatus(item)}
                  />
                ))
              ) : (
                <Tr>
                  <Td colSpan={4}>
                    <Text textAlign="center" py={5}>
                      {emptyText}
                    </Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>

        <Flex justify="center" mt="12px" overflowX="auto" maxW="100%">
          <Pagination currentPage={page} totalPosts={total} postsPerPage={PAGE_SIZE} paginate={setPage} />
        </Flex>
      </Box>
    )
  }

  return (
    <MainLayout>
      {isLoading && <Preloader />}
      {showToast.show && (
        <ShowToast
          message={showToast.message}
          status={showToast.status}
          show={showToast.show}
          duration={showToast.duration}
        />
      )}

      <Text fontSize="21px" lineHeight="25.41px" fontWeight="700">
        Schools{' '}
        <Box as="span" color="#667085" fontWeight="600" fontSize="19px">
          ({totalSchools})
        </Box>
      </Text>
      <Text mt="9px" color="#686C75" fontWeight="400" fontSize="15px" mb={5} lineHeight="24px">
        View and manage school approval requests. Quickly review pending applications and take necessary actions like
        approving or rejecting.
      </Text>

      <Box
        bg="#fff"
        border="1px solid #EFEFEF"
        mt="12px"
        py="17px"
        px={['12px', '18px']}
        rounded="10px"
        maxW="100%"
        overflow="hidden"
      >
        <Tabs>
          {/* stacks on mobile, side-by-side on large screens */}
          <Flex
            direction={['column', 'column', 'column', 'row']}
            justify="space-between"
            align={['stretch', 'stretch', 'stretch', 'center']}
            gap="12px"
          >
            <TabList
              overflowX="auto"
              overflowY="hidden"
              w={['100%', '100%', '100%', 'auto']}
              flexShrink={0}
              borderBottom="1px solid #EFEFEF"
            >
              <Tab {...tabStyle}>
                Pending Approval {countBadge(totalPending)}
              </Tab>
              <Tab {...tabStyle}>
                Approved {countBadge(totalApproved)}
              </Tab>
              <Tab {...tabStyle}>
                Rejected {countBadge(totalRejected)}
              </Tab>
            </TabList>

            <Flex align="center" gap="8px" w={['100%', '100%', '100%', 'auto']} flexWrap={['wrap', 'nowrap']}>
              {!byDate ? (
                <Box flex="1" minW={['0', '220px']}>
                  <Input
                    placeholder="Search"
                    size="sm"
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    bColor="#E4E4E4"
                    leftIcon={<BiSearch />}
                  />
                </Box>
              ) : (
                <Flex flex="1" gap="8px" flexWrap={['wrap', 'nowrap']} minW="0">
                  <Box flex="1" minW="130px">
                    <Input
                      placeholder="Start Date"
                      type="date"
                      size="sm"
                      onChange={(e) => setStartDate(e.target.value)}
                      value={startDate}
                      bColor="#E4E4E4"
                      leftIcon={<FaCalendarAlt />}
                    />
                  </Box>
                  <Box flex="1" minW="130px">
                    <Input
                      placeholder="End Date"
                      type="date"
                      size="sm"
                      onChange={(e) => setEndDate(e.target.value)}
                      value={endDate}
                      bColor="#E4E4E4"
                      leftIcon={<FaCalendarAlt />}
                    />
                  </Box>
                </Flex>
              )}

              <Menu isLazy>
                <MenuButton as={Box} flexShrink={0}>
                  <Flex
                    align="center"
                    gap="6px"
                    border="1px solid #E3E5E8"
                    rounded="7px"
                    p="6px"
                    color="#2F2F2F"
                    fontWeight="500"
                    fontSize="14px"
                    cursor="pointer"
                  >
                    <Text>Filter</Text>
                    <IoFilter />
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setByDate(true)}>
                    <Text>by Date</Text>
                  </MenuItem>
                  <MenuItem onClick={clearFilters}>
                    <Text>Clear Filter</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          <TabPanels>
            <TabPanel px={0}>
              {renderTable({
                list: pendingSchools,
                emptyText: 'No pending schools found.',
                page: pagePending,
                total: totalPending,
                setPage: setPagePending,
              })}
            </TabPanel>

            <TabPanel px={0}>
              {renderTable({
                list: approvedSchools,
                emptyText: 'No approved schools found.',
                page: pageApproved,
                total: totalApproved,
                setPage: setPageApproved,
              })}
            </TabPanel>

            <TabPanel px={0}>
              {renderTable({
                list: rejectedSchools,
                emptyText: 'No rejected schools found.',
                page: pageRejected,
                total: totalRejected,
                setPage: setPageRejected,
              })}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </MainLayout>
  )
}
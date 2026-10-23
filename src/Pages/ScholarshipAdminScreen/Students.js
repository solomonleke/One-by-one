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
import { GetAllScholarshipStudentsApi, ApproveStudentApi } from '../../Utils/ApiCall'
import { configuration } from '../../Utils/Helpers'

const PAGE_SIZE = configuration.sizePerPage

export default function Students() {
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' })
  const [loading, setLoading] = useState(true)
  const [loadingStudentId, setLoadingStudentId] = useState(null)

  // search (server-side, debounced)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // date filter (client-side, applies to the rows currently loaded)
  const [byDate, setByDate] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // lists + totals from the API (totalItems)
  const [pendingStudents, setPendingStudents] = useState([])
  const [approvedStudents, setApprovedStudents] = useState([])
  const [rejectedStudents, setRejectedStudents] = useState([])

  const [totalPending, setTotalPending] = useState(0)
  const [totalApproved, setTotalApproved] = useState(0)
  const [totalRejected, setTotalRejected] = useState(0)

  const [pagePending, setPagePending] = useState(1)
  const [pageApproved, setPageApproved] = useState(1)
  const [pageRejected, setPageRejected] = useState(1)

  const totalStudents = totalPending + totalApproved + totalRejected

  // setters are stable, so this config is safe to use inside useCallback
  const statusConfig = useMemo(
    () => ({
      PENDING: { setList: setPendingStudents, setTotal: setTotalPending, setPage: setPagePending },
      APPROVED: { setList: setApprovedStudents, setTotal: setTotalApproved, setPage: setPageApproved },
      REJECTED: { setList: setRejectedStudents, setTotal: setTotalRejected, setPage: setPageRejected },
    }),
    []
  )

  const fetchStudents = useCallback(
    async (status, page, searchTerm) => {
      const { setList, setTotal, setPage } = statusConfig[status]
      try {
        const result = await GetAllScholarshipStudentsApi(page, PAGE_SIZE, status, searchTerm)

        if (result.status === 200) {
          const students = result.data.data.students || []
          const total = result.data.data.totalItems || 0

          // current page became empty (e.g. last item was moved) -> go back one page
          if (students.length === 0 && page > 1 && total > 0) {
            setPage(page - 1)
            return
          }

          setList(students)
          setTotal(total)
        }
      } catch (e) {
        console.error(`Fetch ${status} students error:`, e.message)
      } finally {
        setLoading(false)
      }
    },
    [statusConfig]
  )

  // debounce search -> reset all tabs to page 1
  useEffect(() => {
    const t = setTimeout(() => {
      setPagePending(1)
      setPageApproved(1)
      setPageRejected(1)
      setDebouncedSearch(searchInput.trim())
    }, 500)
    return () => clearTimeout(t)
  }, [searchInput])

  useEffect(() => {
    fetchStudents('PENDING', pagePending, debouncedSearch)
  }, [pagePending, debouncedSearch, fetchStudents])

  useEffect(() => {
    fetchStudents('APPROVED', pageApproved, debouncedSearch)
  }, [pageApproved, debouncedSearch, fetchStudents])

  useEffect(() => {
    fetchStudents('REJECTED', pageRejected, debouncedSearch)
  }, [pageRejected, debouncedSearch, fetchStudents])

  const refreshAll = () => {
    fetchStudents('PENDING', pagePending, debouncedSearch)
    fetchStudents('APPROVED', pageApproved, debouncedSearch)
    fetchStudents('REJECTED', pageRejected, debouncedSearch)
  }

  const notify = (message, status) => {
    setShowToast({ show: true, message, status })
    setTimeout(() => setShowToast({ show: false, message: '', status: '' }), 3000)
  }

  const updateStudentStatus = async (studentId, STATUS) => {
    setLoadingStudentId(studentId)
    try {
      const result = await ApproveStudentApi(studentId, { status: STATUS, essayPercentage: 0 })

      if (result.status === 200) {
        notify(
          `Student ${STATUS === 'APPROVED' ? 'Approved' : 'Rejected'}!!!`,
          STATUS === 'REJECTED' ? 'error' : 'success'
        )
        refreshAll()
      }
    } catch (e) {
      notify(e.response?.data?.message || e.message || 'Error updating student!!!', 'error')
    } finally {
      setLoadingStudentId(null)
    }
  }

  const applyDateFilter = (list) => {
    if (!byDate || !startDate || !endDate) return list
    const start = new Date(startDate)
    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999)
    return list.filter((item) => {
      const d = new Date(item.created_at)
      return d >= start && d <= end
    })
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
  const renderTable = ({ list, emptyText, page, total, setPage, nextStatus }) => {
    const rows = applyDateFilter(list)
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
                {['name', 'field of study', 'status', 'actions'].map((h) => (
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
                    studentId={item.id}
                    type={'scholarship-admin-students'}
                    name={item.full_name}
                    email={item.email}
                    fieldOfStudy={item.intended_field_of_study}
                    status={item.verification_status}
                    isLoading={loadingStudentId === item.id}
                    buttonText={
                      item.verification_status === 'PENDING'
                        ? 'Approve'
                        : item.verification_status === 'APPROVED'
                        ? 'Reject'
                        : item.verification_status === 'REJECTED'
                        ? 'Unreject'
                        : 'Approve'
                    }
                    onButtonClick={() => updateStudentStatus(item.id, nextStatus)}
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
      {loading && <Preloader />}
      {showToast.show && (
        <ShowToast
          message={showToast.message}
          status={showToast.status}
          show={showToast.show}
          duration={showToast.duration}
        />
      )}

      <Text fontSize="21px" lineHeight="25.41px" fontWeight="700">
        Students{' '}
        <Box as="span" color="#667085" fontWeight="600" fontSize="19px">
          ({totalStudents})
        </Box>
      </Text>
      <Text mt="9px" color="#686C75" fontWeight="400" fontSize="15px" mb={5} lineHeight="24px">
        Review and approve student applications. Manage pending requests and take action to accept or reject them.
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
                list: pendingStudents,
                emptyText: 'No pending students found.',
                page: pagePending,
                total: totalPending,
                setPage: setPagePending,
                nextStatus: 'APPROVED',
              })}
            </TabPanel>

            <TabPanel px={0}>
              {renderTable({
                list: approvedStudents,
                emptyText: 'No approved students found.',
                page: pageApproved,
                total: totalApproved,
                setPage: setPageApproved,
                nextStatus: 'REJECTED',
              })}
            </TabPanel>

            <TabPanel px={0}>
              {renderTable({
                list: rejectedStudents,
                emptyText: 'No rejected students found.',
                page: pageRejected,
                total: totalRejected,
                setPage: setPageRejected,
                nextStatus: 'APPROVED',
              })}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </MainLayout>
  )
}
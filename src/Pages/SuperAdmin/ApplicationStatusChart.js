import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell
} from "recharts";

const data = [
  { name: "Approved", value: 105, fill: "#7A9E9F" },
  { name: "Rejected", value: 23, fill: "#F4B400" },
  { name: "Pending", value: 624, fill: "#C7F3F4" },
];

const ApplicationStatusChart = () => (
    <Box w="100%" bg="#fff" border="1px solid #EFEFEF" rounded="10px" py="20px" px="18px">
    {/* Heading and Legend in a Row */}
    <Flex
  direction={{ base: "column", md: "row" }}
  justify="space-between"
  align={{ base: "flex-start", md: "center" }}
  mb={4}
  gap={{ base: 3, md: 0 }}
>
  <Heading fontSize="md">Application Status</Heading>

  <HStack
    spacing={4}
    wrap="wrap"
    justify={{ base: "flex-start", md: "flex-end" }}
    rowGap={2}
  >
    {data.map((entry) => (
      <HStack key={entry.name} spacing={2}>
        <Box boxSize="10px" bg={entry.fill} borderRadius="full" />
        <Text fontSize="sm">{entry.name}</Text>
        <Text fontWeight="bold" fontSize="sm">
          {entry.value}
        </Text>
      </HStack>
    ))}
  </HStack>
</Flex>

    {/* Chart */}
    <Box w="100%" h="300px">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 20, left: 30, bottom: 5 }} // fix label cutoff
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Bar dataKey="value" isAnimationActive>
            {data.map((entry, index) => (
              <Cell key={`bar-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </Box>
);

export default ApplicationStatusChart;

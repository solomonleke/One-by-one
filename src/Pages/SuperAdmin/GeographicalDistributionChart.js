import { Box, Flex, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Lagos", value: 759 },
  { name: "Kano", value: 300 },
  { name: "Port-Harcourt", value: 12 },
  { name: "Abuja", value: 56 },
];

const COLORS = ["#5A4FCF", "#F4B400", "#00C49F", "#0088FE"];

const GeographicalDistributionChart = () => {
  return (
    <Box
      w="100%"
      bg="#fff"
      border="1px solid #EFEFEF"
      borderRadius="10px"
      py="20px"
      px="20px"
    >
      {/* Heading and Total */}
      <Flex
        justify="space-between"
        align="center"
        flexWrap="wrap"
        rowGap={2}
        mb={4}
      >
        <Heading fontSize="md">Geographical Distribution</Heading>
        <Text color="#878787" fontSize="sm" fontWeight="500">
          Total{" "}
          <Box as="span" color="#080808" fontSize="lg" fontWeight="700">
            6,200
          </Box>
        </Text>
      </Flex>

      {/* Chart and Legend Side-by-Side on large, stacked on small */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={6}
      >
        {/* Chart */}
        <Box flex="1" minW="0" h={{ base: "250px", md: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Legend */}
        <VStack
          align="flex-start"
          spacing={3}
          w={{ base: "100%", md: "auto" }}
        >
          {data.map((entry, index) => (
            <HStack key={entry.name} spacing={3}>
              <Box
                boxSize="12px"
                bg={COLORS[index % COLORS.length]}
                borderRadius="full"
              />
              <Text fontSize="sm">{entry.name}</Text>
              <Text fontWeight="bold" fontSize="sm">
                {entry.value}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export default GeographicalDistributionChart;

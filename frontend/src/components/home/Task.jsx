import { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Checkbox,
  Icon,
  IconButton,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import {
  FaRegCalendar,
  FaPencilAlt,
  FaRegCommentAlt,
  FaEllipsisH,
  FaProjectDiagram,
  FaSun,
  FaRegCalendarAlt,
  FaRedo,
  FaClock,
  FaFlag,
  FaBell,
  FaCheckCircle,
  FaArrowRight,
  FaCopy,
  FaLink,
  FaTrash,
} from "react-icons/fa";
import { RiSofaLine } from "react-icons/ri";
import { RxValueNone } from "react-icons/rx";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../../redux/slices/todoSlice";
const BaseBackendURL = import.meta.env.VITE_BASE_BACKEND_URL;
const token = JSON.parse(localStorage.getItem("todoistAuthToken"));

export default function TaskItem({
  title = "Sample Task",
  todoId,
  description = "This is a sample task description",
  isCompleted = false,
  priority = "medium",
}) {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);

  // Delete Todo
  const handleDeleteTodo = async () => {
    try {
      let res = await axios.delete(`${BaseBackendURL}/todos/delete/${todoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status) {
        console.log(res);
        dispatch(deleteTodo(todoId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      borderBottomWidth={1}
      borderRadius={"md"}
      py={2}
      // color="#f3f3f3"
      // bg={'linear-gradient(to right, #db4c3e 0%, #f19696 100%)'}
      px={2}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Flex align="start">
        <Checkbox
          size="lg"
          colorScheme="green"
          mr={3}
          mt={1}
          isChecked={isCompleted}
        />
        <VStack align="start" spacing={1} flex={1}>
          <Text fontWeight="medium">{title}</Text>
          <Text fontSize="sm" color="gray.600">
            {description}
          </Text>
          <HStack>
            <Icon as={FaRegCalendar} color="orange.500" boxSize={3} />
            <Text fontSize="xs" color="orange.500">
              Tomorrow
            </Text>
          </HStack>
        </VStack>
        {isHovering && (
          <HStack spacing={1}>
            <IconButton
              aria-label="Edit task"
              icon={<FaPencilAlt />}
              size="sm"
              variant="ghost"
            />
            <IconButton
              aria-label="Comment on task"
              icon={<FaRegCommentAlt />}
              size="sm"
              variant="ghost"
            />
            <Popover
              placement="bottom-end"
              strategy="fixed"
              modifiers={[
                {
                  name: "flip",
                  options: {
                    fallbackPlacements: [
                      "top-end",
                      "bottom-start",
                      "top-start",
                    ],
                  },
                },
                {
                  name: "preventOverflow",
                  options: {
                    padding: 8,
                  },
                },
              ]}
            >
              <PopoverTrigger>
                <Button size="sm" variant="ghost">
                  <Icon as={FaEllipsisH} />
                </Button>
              </PopoverTrigger>
              <PopoverContent width="250px">
                <PopoverBody p={0}>
                  <Box
                    maxHeight="400px"
                    overflowY="auto"
                    css={{
                      "&::-webkit-scrollbar": {
                        width: "4px",
                      },
                      "&::-webkit-scrollbar-track": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "gray.300",
                        borderRadius: "24px",
                      },
                    }}
                  >
                    <VStack align="stretch" spacing={0} divider={<Divider />}>
                      <Option
                        icon={FaPencilAlt}
                        text="Edit"
                        shortcut="Ctrl E"
                      />
                      <Option
                        icon={FaProjectDiagram}
                        text="Go to project"
                        shortcut="G"
                      />

                      <VStack align="stretch" p={2} spacing={1}>
                        <Text fontSize="xs" fontWeight="bold" color="gray.500">
                          Due date
                        </Text>
                        <HStack>
                          <Tooltip label="Tomorrow" placement="top">
                            <IconButton
                              size="sm"
                              variant="ghost"
                              icon={<Icon as={FaSun} />}
                              flex={1}
                            />
                          </Tooltip>
                          <Tooltip label="Weekend" placement="top">
                            <IconButton
                              size="sm"
                              variant="ghost"
                              icon={<Icon as={RiSofaLine} />}
                              flex={1}
                            />
                          </Tooltip>
                          <Tooltip label="Next week" placement="top">
                            <IconButton
                              size="sm"
                              variant="ghost"
                              icon={<Icon as={FaRedo} />}
                              flex={1}
                            />
                          </Tooltip>
                          <Tooltip label="No date" placement="top">
                            <IconButton
                              size="sm"
                              variant="ghost"
                              icon={<Icon as={RxValueNone} />}
                            />
                          </Tooltip>
                        </HStack>
                      </VStack>

                      <VStack align="stretch" p={2} spacing={1}>
                        <Text fontSize="xs" fontWeight="bold" color="gray.500">
                          Priority
                        </Text>
                        <HStack>
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FaFlag} color="red.500" />}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FaFlag} color="orange.500" />}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FaFlag} color="blue.500" />}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FaFlag} color="gray.500" />}
                          />
                        </HStack>
                      </VStack>

                      <Option icon={FaBell} text="Reminders" />
                      <Option
                        icon={FaCheckCircle}
                        text="Complete recurring task"
                        rightIcon={FaArrowRight}
                      />
                      <Option
                        icon={FaArrowRight}
                        text="Move to..."
                        shortcut="M"
                      />
                      <Option icon={FaCopy} text="Duplicate" />
                      <Option
                        icon={FaLink}
                        text="Copy link to task"
                        shortcut="Ctrl C"
                      />
                      <Option
                        icon={FaTrash}
                        text="Delete"
                        isDelete={true}
                        shortcut="Ctrl D"
                        handleClick={handleDeleteTodo}
                      />
                    </VStack>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}

function Option({ icon, text, shortcut, rightIcon, isDelete, handleClick }) {
  return (
    <Button
      variant="ghost"
      fontWeight="normal"
      justifyContent="space-between"
      width="100%"
      height="auto"
      py={2}
      onClick={handleClick}
    >
      <HStack color={isDelete ? "#db4c3e" : ""}>
        <Icon as={icon} />
        <Text>{text}</Text>
      </HStack>
      <HStack>
        {shortcut && (
          <Text fontSize="xs" color="gray.500">
            {shortcut}
          </Text>
        )}
        {rightIcon && <Icon as={rightIcon} />}
      </HStack>
    </Button>
  );
}

// Prop Validation
TaskItem.propTypes = {
  todoId: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  priority: PropTypes.string,
  isCompleted: PropTypes.bool,
};

Option.propTypes = {
  icon: PropTypes.func,
  text: PropTypes.string,
  shortcut: PropTypes.string,
  rightIcon: PropTypes.func,
  isDelete: PropTypes.bool,
  handleClick: PropTypes.func,
};

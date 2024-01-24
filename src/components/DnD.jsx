import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { calcLength } from "framer-motion";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const DnD = () => {
    // State to manage items
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
    const [items2, setItems2] = useState([]);

    // Function to handle drag and drop
    const handleDragEnd = (result) => {
        console.log(result);
        const { source, destination } = result;

        setItems2(prev => [...prev, items[source.index] + 'new'])
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>

            <Flex>
                <Droppable droppableId='elements' type='column' isDropDisabled={true}>
                    {(provided) => (
                        <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        // style={{ display: "flex", overflowX: "auto", justifyContent: "center", margin: 20 }}
                        >

                            {
                                items.map((item, index) => <Draggable
                                    key={item}
                                    draggableId={item}
                                    index={index}
                                >
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                // background: "#456C86",
                                                border: "1px solid",
                                                padding: 8,
                                                margin: "0 8px",
                                                width: 200,
                                                // minHeight: 300,
                                                ...provided.draggableProps.style,
                                            }}
                                        >
                                            {item}
                                        </Box>
                                    )}
                                </Draggable>)
                            }


                            {/* <GridItem>Hello</GridItem> */}
                            {provided.placeholder}


                        </Box>
                    )
                    }
                </Droppable>

                <Droppable droppableId='element-drop-source' type='column'>
                    {(provided, snapshot) => (
                        <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            // style={{ display: "flex", overflowX: "auto", justifyContent: "center", margin: 20 }}
                            bgColor={'red'}
                            border="1px solid"
                            minW={'200px'}
                            minH={'250px'}
                        >

                            {
                                items2.map((item, index) => <Draggable
                                    key={item}
                                    draggableId={item}
                                    index={index}
                                    isDragDisabled={true}
                                >
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                // background: "#456C86",
                                                border: "1px solid",
                                                padding: 8,
                                                margin: "0 8px",
                                                width: 200,
                                                // minHeight: 300,
                                                ...provided.draggableProps.style,
                                            }}
                                        >
                                            {item}
                                        </Box>
                                    )}
                                </Draggable>)
                            }
                            {provided.placeholder}
                        </Box>
                    )
                    }
                </Droppable>
            </Flex>
        </DragDropContext>
    );
};

export default DnD;
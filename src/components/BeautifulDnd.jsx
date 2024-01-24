import { Box, Flex, List, ListItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const BeautifulDnd = () => {

    const [elemets, setElements] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
    const [selects, setSelects] = useState([]);
    const [selects2, setSelects2] = useState([]);

    const handlerOnDraf = (result) => {

        const { source, destination } = result;

        // if()
        console.log(result);

        if (destination.droppableId === 'element-drop-source') {

            // console.log(20, destination.index);

            if (selects.length === 0) {

                setSelects([elemets[source.index]])
            } else {

                const newSelects = selects.splice(destination.index, 0, elemets[source.index])
                setSelects2(prev => [...prev, newSelects])

            }
        }

        if (destination.droppableId === 'element-drop-source-second') {
            setSelects2(prev => [...prev, elemets[source.index]])
        }

        console.log(selects);

    }

    return (
        <DragDropContext onDragEnd={handlerOnDraf}>

            <Flex justifyContent="center" mt={10}>
                <Droppable droppableId='elements' type='elements'>
                    {(provided) => (
                        <List __css={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid", padding: "20px" }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {
                                elemets.map((elemet, index) => <Draggable
                                    key={elemet}
                                    draggableId={elemet}
                                    index={index}
                                >
                                    {(provided) => (
                                        <ListItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{ ...provided.draggableProps.style, }}
                                            border="1px solid"
                                            px={5}
                                            py={2}
                                        >

                                            {elemet}
                                        </ListItem>
                                    )}
                                </Draggable>)
                            }
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </Flex>

            <Flex
                justifyContent="center"
                mt={20}
                gap={200}
            >
                {/* SELECTS FIRST */}
                <Droppable droppableId='element-drop-source' type='elements'>
                    {(provided) => (
                        <List __css={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "10px", border: "1px solid", padding: "20px", minHeight: "200px", minWidth: "200px" }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {
                                selects.map((item, index) => <Draggable
                                    key={item}
                                    draggableId={item}
                                    index={index}
                                    isDragDisabled
                                >
                                    {(provided) => (
                                        <ListItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps.style}
                                            border="1px solid"
                                            px={5}
                                            py={2}
                                        >

                                            {item}
                                        </ListItem>
                                    )}
                                </Draggable>)
                            }
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>

                {/* SELECTS SECOND */}
                {/* <Droppable droppableId='element-drop-source-second' type='elements'>
                    {(provided) => (
                        <List __css={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "10px", border: "1px solid", padding: "20px", minHeight: "200px", minWidth: "200px" }}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {
                                selects2.map((item, index) => <Draggable
                                    key={item}
                                    draggableId={item}
                                    index={index}
                                    isDragDisabled
                                >
                                    {(provided) => (
                                        <ListItem
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps.style}
                                            border="1px solid"
                                            px={5}
                                            py={2}
                                        >

                                            {item}
                                        </ListItem>
                                    )}
                                </Draggable>)
                            }
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable> */}
            </Flex>
        </DragDropContext>
    );
};

export default BeautifulDnd;
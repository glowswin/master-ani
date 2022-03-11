import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: pink;
`;

const Grid = styled.div`
  width: 500px;
  height: 500px;
  display: grid;
  gap: 10px;
  grid-template: 1fr 1fr/1fr 1fr;
  margin-bottom: 50px;
`;
const Button = styled(motion.button)`
  border-radius: 5px;
  background-color: white;
  color: blue;
  font-size: 20px;
  padding: 6px 20px;
  font-weight: 800;
  text-align: center;
  cursor: pointer;
`;
const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Circle = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: white;
`;
const Overlay = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 200px;
    height: 100px;
    background-color: rgba(255, 255, 255, 1);
  }
`;
const boxVariants = {
  hover: { scale: 1.2 },
};
const buttonVariants = {
  hover: { scale: 2, color: "rgb(255, 0, 0)" },
};
const App = () => {
  const [id, setId] = useState<string | null>(null);
  const [isclick, setIsclick] = useState<boolean>(false);
  const onChangeId = (item: number) => setId(item.toString());
  const ondown = () => setIsclick(true);
  const onup = () => setIsclick(false);

  return (
    <Container>
      <Grid>
        {[1, 2, 3, 4].map((item) =>
          item === 1 || item === 4 ? (
            <Box
              style={
                item === 1
                  ? { originX: 1, originY: 1 }
                  : { originX: 0, originY: 0 }
              }
              key={item}
              layoutId={item + ""}
              variants={boxVariants}
              whileHover="hover"
              onClick={() => onChangeId(item)}
            ></Box>
          ) : (
            <Box key={item}>
              {item === 2 && !isclick ? <Circle layoutId="won" /> : null}
              {item === 3 && isclick ? <Circle layoutId="won" /> : null}
            </Box>
          )
        )}
      </Grid>
      <AnimatePresence>
        {id && (
          <Overlay
            onClick={() => setId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box
              layoutId={id}
              style={{
                width: 400,
                height: 200,
              }}
            ></Box>
          </Overlay>
        )}
      </AnimatePresence>
      <div>
        <Button
          variants={buttonVariants}
          whileHover="hover"
          onMouseDown={ondown}
          onMouseUp={onup}
        >
          Switch
        </Button>
      </div>
    </Container>
  );
};

export default App;

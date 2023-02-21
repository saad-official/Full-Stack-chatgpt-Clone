import React from "react";
import Backdrop from "./Backdrop";
import { AnimatePresence, motion } from "framer-motion";
import ModelSelection from "./ModelSelection";
type Props = {
  handleClose?: React.MouseEventHandler,
  modelOpen?:boolean
}
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: "25",
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};


const Model = ({ handleClose, modelOpen}:Props) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal   bg-gray-500 border text-gray-800"
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
          >
                <ModelSelection />
              {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, nihil?</p> */}
              <button className="mt-12 ml-auto px-2 py-1 bg-orange-500 text-white" onClick={handleClose}>Close</button>
      </motion.div>
    </Backdrop>
  );
};

export default Model;

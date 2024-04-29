"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "@/styles/base/background.module.scss";

type PropTypes = {
    SPEED_X: number;
    SPEED_Y: number;
    upper_bound: number;
    lower_bound: number;
    left_bound: number;
    right_bound: number;
};

export default function Circle({
    SPEED_X,
    SPEED_Y,
    upper_bound,
    lower_bound,
    left_bound,
    right_bound,
}: PropTypes) {
    const [x, setX] = useState(0);
    const [speedX, setSpeedX] = useState(SPEED_X);
    const [y, setY] = useState(0);
    const [speedY, setSpeedY] = useState(SPEED_Y);
    return (
        <motion.div
            initial={{
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={{ x: x, y: y }}
            transition={{
                ease: "circInOut",
            }}
            onAnimationComplete={() => {
                // TODO : Make the movement more smooth when the circles changes its paths
                setX(x + speedX);
                setY(y + speedY);
                if (x < upper_bound) {
                    setSpeedX(Math.abs(SPEED_X));
                }
                if (x > lower_bound) {
                    setSpeedX(-Math.abs(SPEED_X));
                }
                if (y < left_bound) {
                    setSpeedY(Math.abs(SPEED_Y));
                }
                if (y > right_bound) {
                    setSpeedY(-Math.abs(SPEED_Y));
                }
            }}
            className={`${styles.circle}`}
        ></motion.div>
    );
}

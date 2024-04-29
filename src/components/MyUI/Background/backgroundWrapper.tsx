import React, { ReactNode, useState } from "react";
import styles from "@/styles/base/background.module.scss";
import { motion } from "framer-motion";
import Circle from "./Circle";

const UPPER_BOUND = -75;
const LOWER_BOUND = 75;
const LEFT_BOUND = -100;
const RIGHT_BOUND = 100;

type CircleAttr = {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
};

export default function BackgroundWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <>
            <Circle
                SPEED_X={10}
                SPEED_Y={10}
                upper_bound={UPPER_BOUND}
                lower_bound={LOWER_BOUND}
                left_bound={LEFT_BOUND}
                right_bound={RIGHT_BOUND}
            />
            <Circle
                SPEED_X={-10}
                SPEED_Y={-7}
                upper_bound={UPPER_BOUND}
                lower_bound={LOWER_BOUND}
                left_bound={LEFT_BOUND}
                right_bound={RIGHT_BOUND}
            />
            <Circle
                SPEED_X={15}
                SPEED_Y={-8}
                upper_bound={UPPER_BOUND}
                lower_bound={LOWER_BOUND}
                left_bound={LEFT_BOUND}
                right_bound={RIGHT_BOUND}
            />

            <div className={`${styles.animated_background}`}>{children}</div>
        </>
    );
}

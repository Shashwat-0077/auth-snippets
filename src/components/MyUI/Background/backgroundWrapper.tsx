import React, { ReactNode, useState } from "react";
import styles from "@/styles/base/background.module.scss";
import { motion } from "framer-motion";
import Circle from "./Circle";

const UPPER_BOUND = -100;
const LOWER_BOUND = 100;
const LEFT_BOUND = -150;
const RIGHT_BOUND = 150;

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
                SPEED_X={1.2}
                SPEED_Y={-3}
                upper_bound={UPPER_BOUND}
                lower_bound={LOWER_BOUND}
                left_bound={LEFT_BOUND}
                right_bound={RIGHT_BOUND}
            />
            <Circle
                SPEED_X={3}
                SPEED_Y={2.2}
                upper_bound={UPPER_BOUND}
                lower_bound={LOWER_BOUND}
                left_bound={LEFT_BOUND}
                right_bound={RIGHT_BOUND}
            />
            <Circle
                SPEED_X={-3}
                SPEED_Y={1.5}
                upper_bound={UPPER_BOUND}
                lower_bound={LOWER_BOUND}
                left_bound={LEFT_BOUND}
                right_bound={RIGHT_BOUND}
            />

            <div className={`${styles.animated_background}`}>{children}</div>
        </>
    );
}

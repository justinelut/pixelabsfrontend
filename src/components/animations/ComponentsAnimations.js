"use client"
import { motion } from 'framer-motion'
import React from 'react'

export const featuredAnimations = {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 }
}

export default function ComponentsAnimations({ children }) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            {children}
        </motion.div>
    )
}
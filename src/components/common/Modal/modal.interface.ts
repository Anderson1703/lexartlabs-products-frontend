import { ReactNode } from "react";

export interface ModalI{
    title: string;
    children: ReactNode,
    isModalOpen: boolean;
    toggleClose:()=>void;
}
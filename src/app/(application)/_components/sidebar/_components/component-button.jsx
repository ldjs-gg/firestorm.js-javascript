/**
 * Component Button
 * 
 * A specialized button component for the sidebar that adapts to collapsed state.
 * Features include:
 * - Gradient background
 * - Icon display
 * - Collapsible text
 * - Hover effects
 */

import { Button } from "@/components/ui/button";
import Image from "next/image";

/**
 * Component Button
 * 
 * Renders a button with an icon and optional text that adapts to sidebar state.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.isCollapsed] - Whether the sidebar is in collapsed state
 * @returns {JSX.Element} A responsive button component
 */
export default function ComponentButton({ isCollapsed }) {
  return (
    <Button 
      variant="ghost" 
      size="lg" 
      className={`cursor-pointer shadow-sm text-xs w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:opacity-80 transition-opacity duration-300 hover:text-white ${isCollapsed ? 'px-0 justify-center' : ''}`}
    >
      <span className="flex items-center justify-center">
        <Image src="/icons/add-light.svg" alt="Add Icon" width={20} height={20} />
      </span>
      {!isCollapsed && "Component Button"}
    </Button>
  );
} 
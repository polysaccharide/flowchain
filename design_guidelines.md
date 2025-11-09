# Design Guidelines: Business Unit Configuration Management System

## Design Approach

**Selected Framework**: Material Design for Enterprise Applications
**Justification**: This is a utility-focused, data-intensive admin tool requiring clear information hierarchy, efficient workflows, and proven UI patterns for CRUD operations.

## Core Design Elements

### Typography
- **Font Family**: Roboto or Inter via Google Fonts CDN
- **Heading Hierarchy**:
  - Page titles: text-2xl font-semibold
  - Section headers: text-lg font-medium
  - Table headers: text-sm font-medium uppercase tracking-wide
  - Body text: text-base font-normal
  - Helper text: text-sm font-normal
- **Form labels**: text-sm font-medium mb-1

### Layout System

**Spacing Units**: Tailwind units of 2, 4, 6, and 8 (p-2, m-4, gap-6, py-8)
- **Page container**: max-w-7xl mx-auto px-6 py-8
- **Component spacing**: mb-6 between major sections, mb-4 between form groups
- **Table padding**: px-6 py-4 for cells
- **Form field spacing**: gap-4 for form grid layouts

**Grid System**:
- Form fields: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
- Action buttons: flex gap-2 justify-end

## Component Library

### Navigation & Header
- Top navigation bar with system branding
- Breadcrumb trail showing current page location (text-sm with chevron separators)
- Page title with action button aligned to the right

### Data Table (List Page)
- **Table Structure**: Full-width responsive table with alternating row treatment
- **Headers**: Sticky header with sorting indicators
- **Columns**: No., Business Unit, DC, Actions (icon buttons)
- **Pagination**: Bottom-aligned with page numbers, previous/next controls, and items-per-page selector
- **Search**: Top-right positioned search input with icon (w-64)
- **Action Buttons**: Icon buttons for Edit (pencil) and Delete (trash), size 8x8, aligned right in Actions column

### Form Components (Form Page)
- **Input Fields**: Full-width text inputs with floating labels or top-aligned labels, h-10 standard height
- **Select Dropdowns**: Matching input styling with chevron-down icon
- **Checkboxes**: Standard size with label spacing of ml-2
- **Tab Navigation**: Horizontal tabs (Default Order Info, Subcontractor) with underline indicator for active tab
- **Form Sections**: Organized in responsive grid (1-3 columns based on viewport)
- **Required Field Indicators**: Asterisk (*) in labels

### Buttons
- **Primary CTA**: px-6 py-2 rounded font-medium (e.g., "Save", "Create Business Unit")
- **Secondary**: px-6 py-2 rounded with border (e.g., "Cancel")
- **Icon-only**: p-2 rounded size-appropriate for table actions

### Cards & Containers
- **Form container**: Rounded border with p-6 elevation
- **Table container**: Rounded border with overflow handling

### Icons
Use Material Icons via CDN:
- Search, Edit (pencil), Delete (trash), ChevronDown, ChevronRight, Close, Add
- Size: w-5 h-5 for inline icons, w-4 h-4 for small contexts

## Page-Specific Layouts

### List Page Structure
1. **Header section**: Page title "Business Unit Config List" + "Create Business Unit" button (flex justify-between items-center mb-6)
2. **Search bar**: Right-aligned, mb-4
3. **Data table**: Full-width with sticky header
4. **Pagination controls**: mt-4 flex justify-between items-center

### Form Page Structure
1. **Header**: Page title "Business Unit Config" + breadcrumb
2. **Tab navigation**: mb-6
3. **Form grid**: Responsive 3-column layout for fields
4. **Checkbox group**: Single column section for New Job, HUB available, First shipment
5. **Action buttons**: Bottom-right aligned Save + Cancel (mt-8)

## Accessibility
- All form inputs with associated labels (for/id matching)
- Required fields marked with aria-required
- Table headers with proper scope attributes
- Keyboard navigation support for all interactive elements
- Focus states with visible outlines (ring-2)

## Animations
None. Focus on instant, responsive interactions for efficiency.
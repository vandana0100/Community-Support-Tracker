# Community Support Tracker - Style Guide  

This document serves as the style guide for the Community Support Tracker project. It outlines the conventions and design principles used in the HTML and CSS files for consistency and maintainability.

---

## Typography
- **Font Family**: `Arial, sans-serif`
- **Base Font Size**: `16px`
- **Line Height**: `1.6`
- **Text Colors**:
  - Primary Text: `#333`
  - Link Hover: `#2ecc71`
- **Headings**:
  - Color: `#3498db`
  - Margin: Adjusted for spacing between content.
- **Body Background Color**: `#f4f4f9`

---

## Color Palette
| Element                    | Color Code  | Usage                       |
|----------------------------|-------------|-----------------------------|
| Primary Background         | `#3498db`   | Header and buttons          |
| Accent (Hover/Links)       | `#2ecc71`   | Links, button hover effects |
| Text                       | `#333`      | Main text content           |
| Background                 | `#f4f4f9`   | Page background             |
| Section Background         | `#ffffff`   | Sections, forms             |

---

## Layout
- **Header**:
  - Background Color: `#3498db`
  - Text Alignment: `center`
  - Navigation: Horizontal layout with flexbox. 
  - Responsive Behavior: Vertical alignment on smaller screens.

- **Main Content**:
  - Padding: `20px`
  - Sections:
    - Background Color: `#ffffff`
    - Rounded Corners: `8px`
    - Box Shadow: Subtle shadow for depth: `0 2px 5px rgba(0, 0, 0, 0.1)`

- **Footer**:
  - Background Color: `#2ecc71`
  - Text Alignment: `center`
  - Padding: `10px 0`

---

## Forms
- **Input Fields and Textarea**:
  - Width: `100%`
  - Padding: `10px`
  - Border: `1px solid #ccc`
  - Border Radius: `4px`
  - Font Size: `14px`
  - Margin: `15px` below each element.

- **Buttons**:
  - Background Color: `#3498db`
  - Text Color: `#ffffff`
  - Hover State: Background changes to `#2ecc71`
  - Padding: `10px`
  - Font Size: `16px`
  - Font Weight: `bold`

---

## Responsive Design
- Breakpoint: `768px`
  - Navigation switches to a vertical layout.
  - Sections adjust padding for smaller screen sizes.

---

## Code Conventions
### **HTML**
- Semantic HTML is used (e.g., `<header>`, `<section>`, `<footer>`).
- Proper indentation with 2 spaces per level.
- Consistent use of double quotes (`"`) for attributes.
- Class names follow a **kebab-case** convention (e.g., `main-content`, `navbar`).

### **CSS**
- Follows BEM-like conventions for naming:
  - Blocks: `.header`, `.navbar`
  - Elements: `.navbar ul`, `.section h2`
  - Modifiers (if needed): `.button--active`
- Use of shorthand properties where applicable.
- Comments included to explain major sections of the CSS.

---

## Design Guidelines
1. **Consistency**: All sections maintain a similar layout and spacing to create a cohesive design.
2. **Accessibility**:
   - Buttons and links have visible hover states.
   - Sufficient contrast between text and background colors.
3. **Responsiveness**: The layout is adaptive for mobile screens without breaking functionality or readability.

---

## File Structure
### HTML
- `template.html`: Contains the main structure of the webpage, including reusable header, main content, and footer.

### CSS
- `styles.css`: Contains all styles for layout, typography, forms, and responsiveness.

---

This style guide ensures that developers and designers can maintain and expand the project while adhering to a unified design and code style.

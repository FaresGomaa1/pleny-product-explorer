# Product Explorer - Angular Frontend Web Developer Technical Task

## Overview

This project is a frontend web application developed in Angular, aimed at helping users explore different products in an easy manner. The application includes features such as user authentication, product viewing with pagination, product search, category filtering, and a basic cart functionality.

## Features

- User Authentication via Login using the Authentication API
- Viewing products in a paginated manner using the Products API
- Authentication required before viewing products
- Product search functionality
- Product filtering based on categories
- Adding products to cart and displaying the cart count

## Tech Stack

- Angular 14 or above
- HTML, SCSS
- State Management: NgRx (Bonus)
- GitHub for version control

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/product-explorer.git
   cd product-explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200`.

## Usage

1. **Login:**
   - Navigate to the login page and enter your credentials.
   - On successful login, you will be redirected to the product listing page.

2. **View Products:**
   - Products are displayed in a paginated manner.
   - Use the pagination controls to navigate between pages.

3. **Search and Filter:**
   - Use the search bar to find products by name.
   - Use the category filter to filter products based on selected categories.

4. **Cart:**
   - Add products to the cart by clicking the "Add to Cart" button.
   - The cart count will be updated accordingly.

## Project Structure

```plaintext
src/
├── app/
│   ├── auth/
│   │   ├── auth.service.ts
│   │   ├── login/
│   │   │   ├── login.component.html
│   │   │   ├── login.component.scss
│   │   │   ├── login.component.ts
│   ├── core/
│   │   ├── services/
│   │   │   ├── product.service.ts
│   │   │   ├── cart.service.ts
│   ├── products/
│   │   ├── product-list/
│   │   │   ├── product-list.component.html
│   │   │   ├── product-list.component.scss
│   │   │   ├── product-list.component.ts
│   ├── shared/
│   │   ├── models/
│   │   │   ├── product.model.ts
│   │   ├── components/
│   │   │   ├── pagination/
│   │   │   │   ├── pagination.component.html
│   │   │   │   ├── pagination.component.scss
│   │   │   │   ├── pagination.component.ts
│   ├── app-routing.module.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.ts
│   ├── app.module.ts
```

## Development Notes

- Followed the DRY principle to avoid code duplication.
- Modular structure to keep the code organized and maintainable.
- Used SCSS for styling, following the provided Figma design.
- Applied route guards to protect authenticated routes.
- Written unit tests for services and components to ensure code quality.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes. Ensure your code adheres to the project's coding standards and includes tests for any new functionality.

## License

This project is licensed under the MIT License.

## Contact

For any further questions or inquiries, feel free to contact us at [careers@pleny.com](mailto:careers@pleny.com).
```

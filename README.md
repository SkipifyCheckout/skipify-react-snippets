# skipify-react-snippets
Guidance for implementation of the Skipify experience following our best practices.

## Demo Page

The demo page is hosted at [https://skipifycheckout.github.io/skipify-react-snippets](https://skipifycheckout.github.io/skipify-react-snippets)

## Running the Project Locally

To run the project locally, follow these steps:

1. Install the dependencies:
    ```bash
    npm install
    ```

2. Create a `.env` file in the root directory with the following values:
    ```properties
    VITE_MERCHANT_ID=your-merchant-id
    VITE_SCRIPT_URL=your-script-url
    ```

    Example:
    ```properties
    VITE_MERCHANT_ID=2ee311f7-645c-4c32-856a-891ef65e9a62
    VITE_SCRIPT_URL=https://cdn.skipify.com/sdk/checkoutsdk.js  # for production
    # or
    VITE_SCRIPT_URL=https://stagecdn.skipify.com/sdk/checkoutsdk.js  # for staging
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

## Examples

- **Timeout**: If Skipify checkout is triggered but not completed within 10 seconds, the order will time out, and the user will be redirected to the homepage
- **Redirect**: After completing a purchase in Skipify, the user is seamlessly redirected to the order confirmation page.


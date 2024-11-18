This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### 1. Install Dependencies

First, install the required dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Make sure to set the environment variables in a .env.local file. For example:
```bash
NEXT_PUBLIC_BASE_URL=https://techtest.youapp.ai/api/
```

## Design Clarification

You might notice that the design in this project differs slightly from the Figma mockups. Specifically, I have removed two main inputs on the "About" component: **Image** and **Gender**. The reason for this is that the API does not provide the necessary data to serve these fields, and I was unsure how to store this data in a consistent manner.

In place of these fields, I have added the following additional features that were not present in the design:

- **Authorization system**: This ensures that only authorized users can access certain parts of the application.
- **Validation system**: To ensure that input fields are correctly validated before submission.
- **Logout system**: Users can log out, and their session will be properly handled.

I believe these changes are beneficial and align with the overall goals of the project, but I wanted to clarify them here.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Contact Information

If you encounter any issues or errors with this project, feel free to reach out to me:

- **Name**: Muhammad Alifyan Satrio Nugroho
- **Email**: [m.alifyan02@gmail.com](mailto:m.alifyan02@gmail.com)
- **Phone**: +62 89670175461
- **LinkedIn**: [linkedin.com/in/alifyan](https://linkedin.com/in/alifyan)

"use client";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className="bg-gray-50 text-gray-900">
          <main className="container mx-auto p-6">{children}</main>
        </body>
      </html>
    </Provider>
  );
}

import { Field, Form, Formik } from "formik";

export const AddTransactionForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        amount: 0,
        date: "",
      }}
      onSubmit={(values) => {
        console.log("values:", values);
      }}
    >
      <Form>
        <div className="pb-4">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Field
              name="name"
              type="text"
              className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 active:ring-2 active:ring-blue-500"
            />
          </div>
        </div>

        <div className="pb-4">
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Field
              name="description"
              type="text"
              className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 active:ring-2 active:ring-blue-500"
            />
          </div>
        </div>

        <div className="pb-4">
          <div className="flex flex-col">
            <label
              htmlFor="amount"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <Field
              name="amount"
              type="number"
              className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 active:ring-2 active:ring-blue-500"
            />
          </div>
        </div>

        <div className="pb-4">
          <div className="flex flex-col ring-0">
            <label
              htmlFor="date"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <Field
              name="date"
              type="date"
              className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 active:ring-2 active:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-1 w-full rounded-lg bg-sky-400 p-2 text-center font-bold text-white shadow hover:bg-sky-500 focus:ring-2 focus:ring-sky-500/30"
        >
          Save
        </button>
      </Form>
    </Formik>
  );
};

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

type Props = {
  onSearch: (term: string) => void;
};

const validationSchema = Yup.object().shape({
  search: Yup.string().min(2, 'En az 2 karakter girin'),
});

export default function SearchBar  ({ onSearch }: Props)  {
  return (
    <Formik
      initialValues={{ search: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (values.search.trim() === '') {
          return; 
        }
        onSearch(values.search.trim());
      }}
    >
      {({ errors }) => (
        <>
        <Form className="flex gap-3 items-center mt-6">
          <Field
            name="search"
            placeholder="Egzersiz ara..."
            className="px-4 py-2 border rounded w-full"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Ara
          </button>
        
          
        </Form>
            <div className="text-red-500 text-sm ml-2 inline-block">{errors.search}</div>
            </>
      )}
    </Formik>
  );
};

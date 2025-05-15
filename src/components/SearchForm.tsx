import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
  onSearch: (term: string) => void;
}

const SearchForm = ({ onSearch }: Props) => {
  const formik = useFormik({
    initialValues: { query: '' },
    validationSchema: Yup.object({
      query: Yup.string().min(2, 'En az 2 karakter').required('Zorunlu alan'),
    }),
    onSubmit: (values) => {
      onSearch(values.query.toLowerCase());
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex gap-2 items-center my-4">
      <input
        type="text"
        name="query"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.query}
        placeholder="Egzersiz ara..."
        className="border px-4 py-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Ara
      </button>
      {formik.touched.query && formik.errors.query && (
        <div className="text-red-500 text-sm mt-1">{formik.errors.query}</div>
      )}
    </form>
  );
};

export default SearchForm;

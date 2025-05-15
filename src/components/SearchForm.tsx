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
    <form onSubmit={formik.handleSubmit} className="relative my-8">
      <div className="flex items-center group overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-blue-400 transition-all duration-300">
        <div className="pl-4 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          name="query"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.query}
          placeholder="Egzersiz ara..."
          className="w-full py-3.5 px-3 bg-transparent border-none focus:outline-none placeholder-gray-400 text-gray-700"
        />
        <button
          type="submit"
          className="px-6 py-3.5 font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
        >
          Ara
        </button>
      </div>
      {formik.touched.query && formik.errors.query && (
        <div className="absolute mt-1 text-sm font-medium text-red-500">{formik.errors.query}</div>
      )}
    </form>
  );
};

export default SearchForm;

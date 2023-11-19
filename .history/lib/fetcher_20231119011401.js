import useSWR from "swr";

const baseUrl = "https://main.d6iszn1o7sirg.amplifyapp.com/";

const response = (...args) => fetch(...args).then((res) => res.json());

export default function fetcher(endpoint) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(`${baseUrl}${endpoint}`, response);
  return { data: data, isLoading: !error && !data, isError: error };
}
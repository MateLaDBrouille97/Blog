import useSWR from "swr";

const baseUrl = process.env.baseURL;

const response = (...args) => fetch(...args).then((res) => res.json());

export default function fetcher(endpoint) {
  const { data, error } = useSWR(`${baseUrl}${endpoint}`, response);
  return { data: data, isLoading: !error && !data, isError: error };
}

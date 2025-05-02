/**
 * @name use-api-wrapper
 * @author Yousef Ali
 * @summary This file will be containing all the handle methods for fetching data using all request methods.
 * @description As you can see in the file we are using @tanstack/react-query for fetching data.
 * @access private
 *
 * @function useQueryWrapper This is the main function to be re-used outside the file to call or fetch some data.
 * @function useMutationWrapper This is the main function to be re-used outside the file to call or fetch some data.
 * @readonly Please don't make any changes to this file.
 */

import {
   dehydrate,
   MutationFunction,
   QueryClient,
   QueryFunction,
   QueryKey,
   useMutation,
   UseMutationOptions,
   UseMutationResult,
   useQuery,
   UseQueryOptions,
   UseQueryResult,
 } from "@tanstack/react-query";
 
 /**
  * @description All API calls should be wrapped by this hook.
  * This will be returning the same object that a normal useQuery hook usage has.
  * We just added a layer to give rooms for uniform calls.
  * Use this wrapper to ensure uniformity across the app.
  */
 
 // Helper function to create a Query Client and fetch data on the server
 export async function prefetchQuery<TQueryFnData, TError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
   identifier: TQueryKey,
   apiFn: QueryFunction<TQueryFnData, TQueryKey>,
   options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "queryFn"> = {}
 ) {
   const queryClient = new QueryClient();
   await queryClient.prefetchQuery({ queryKey: identifier, queryFn: apiFn, ...options });
   const dehydratedState = dehydrate(queryClient);
   return { dehydratedState, queryClient };
 }
 
 /**
  * Use this on getting data related actions.
  * A query can be used with any Promise-based method (including GET and POST methods)
  * to fetch data from a server. If your method modifies data on the server,
  * we recommend using Mutations instead.
  * https://tanstack.com/query/latest/docs/react/guides/queries
  *
  */
 
 export function useQueryWrapper<
   TQueryFnData = unknown,
   TError = unknown,
   TData = TQueryFnData,
   TQueryKey extends QueryKey = QueryKey,
 >(
   identifier: TQueryKey,
   apiFn: QueryFunction<TQueryFnData, TQueryKey>,
   options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "queryFn"> = {}
 ): UseQueryResult<TData, TError> {
   return useQuery({
     queryKey: identifier,
     queryFn: apiFn,
     ...options,
   });
 }
 
 /**
  * Unlike queries, mutations are typically used to create/update/delete data or perform server-side effects.
  * https://tanstack.com/query/latest/docs/react/guides/mutations
  *
  */
 
 export function useMutationWrapper<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
   mutationFn: MutationFunction<TData, TVariables>,
   options: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn"> = {}
 ): UseMutationResult<TData, TError, TVariables, TContext> {
   return useMutation({
     mutationFn,
     ...options,
   });
 }
 
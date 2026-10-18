import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

import ApiReducer from "../reducer/ProductReducer";

const AppContext = createContext();

const initialState = {
  // loading & error
  isLoading: false,
  isError: false,

  // Address Module
  district: [],
  upazila: [],

  // Product module
  category: [],
  unpaginate_category: [],
  year: [],
  unpaginate_year: [],
  license: [],
  unpaginate_license: [],

  product: [],
  unpaginate_product: [],

  // Contact Module
  contact: [],
  unpaginate_contact: [],

  // Settings Module
  client: [],
  unpaginate_client: [],

  general_settings: {},
  unpaginate_general_settings: {},

  // Blog Module
  blog: [],
  unpaginate_blog: [],

  // order & purchase module
  purchase: [],
  order: [],

  // User / Customer module
  all_users: [],
  c_user: {},
};

const ProductContext = ({ children }) => {
  const [state, dispatch] = useReducer(ApiReducer, initialState);

  // all urls
  const urls = {
    // Address Module
    district: `${process.env.REACT_APP_BASE_URL}/address_api/districts/`,
    upazila: `${process.env.REACT_APP_BASE_URL}/address_api/upazilas/`,

    // Product module
    category: `${process.env.REACT_APP_BASE_URL}/product_api/category/`,
    unpaginateCategory: `${process.env.REACT_APP_BASE_URL}/product_api/unpaginate_category/`,
    year: `${process.env.REACT_APP_BASE_URL}/product_api/year/`,
    unpaginateYear: `${process.env.REACT_APP_BASE_URL}/product_api/unpaginate_year/`,
    license: `${process.env.REACT_APP_BASE_URL}/product_api/license/`,
    unpaginateLicense: `${process.env.REACT_APP_BASE_URL}/product_api/unpaginate_license/`,

    product: `${process.env.REACT_APP_BASE_URL}/product_api/product/`,
    unpaginateProduct: `${process.env.REACT_APP_BASE_URL}/product_api/unpaginate_product/`,

    // Contact Module
    contact: `${process.env.REACT_APP_BASE_URL}/contact_api/contact/`,
    unpaginateContact: `${process.env.REACT_APP_BASE_URL}/contact_api/unpaginate_contact/`,

    // Settings module
    client: `${process.env.REACT_APP_BASE_URL}/settings_api/client/`,
    unpaginateClient: `${process.env.REACT_APP_BASE_URL}/settings_api/unpaginate_client/`,

    generalSettings: `${process.env.REACT_APP_BASE_URL}/settings_api/general_settings/1/`,
    unpaginateGeneralSettings: `${process.env.REACT_APP_BASE_URL}/settings_api/unpaginate_general_settings/1/`,

    // Blog Module
    blog: `${process.env.REACT_APP_BASE_URL}/blog_api/blog/`,
    unpaginateBlog: `${process.env.REACT_APP_BASE_URL}/blog_api/unpaginate_blog/`,

    // order & purchase module
    purchase: `${process.env.REACT_APP_BASE_URL}/purchase/`,
    order: `${process.env.REACT_APP_BASE_URL}/order/`,

    // User / Customer module
    allUsers: `${process.env.REACT_APP_BASE_URL}/custom_user/all_users/`,
    currentUser: `${process.env.REACT_APP_BASE_URL}/custom_user/current_user/`,
  };

  // Fetch data function with useCallback
  const fetchData = useCallback(async (url, actionType) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      dispatch({ type: actionType, payload: result });
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      dispatch({ type: "API_ERROR" });
    }
  }, []);

  // Memoize all fetch functions using useCallback
  // Address module
  const fetchDistrict = useCallback(
    () => fetchData(urls.district, "SET_API_DISTRICT"),
    [fetchData, urls.district],
  );

  const fetchUpazila = useCallback(
    () => fetchData(urls.upazila, "SET_API_UNPAGINATE_UPAZILA"),
    [fetchData, urls.upazila],
  );

  // Product module
  const fetchCategory = useCallback(
    () => fetchData(urls.category, "SET_API_CATEGORY"),
    [fetchData, urls.category],
  );

  const fetchUnpaginateCategory = useCallback(
    () => fetchData(urls.unpaginateCategory, "SET_API_UNPAGINATE_CATEGORY"),
    [fetchData, urls.unpaginateCategory],
  );

  const fetchYear = useCallback(
    () => fetchData(urls.year, "SET_API_YEAR"),
    [fetchData, urls.year],
  );

  const fetchUnpaginateYear = useCallback(
    () => fetchData(urls.unpaginateYear, "SET_API_UNPAGINATE_YEAR"),
    [fetchData, urls.unpaginateYear],
  );

  const fetchLicense = useCallback(
    () => fetchData(urls.license, "SET_API_LICENSE"),
    [fetchData, urls.license],
  );

  const fetchUnpaginateLicense = useCallback(
    () => fetchData(urls.unpaginateLicense, "SET_API_UNPAGINATE_LICENSE"),
    [fetchData, urls.unpaginateLicense],
  );

  const fetchProduct = useCallback(
    () => fetchData(urls.product, "SET_API_PRODUCT"),
    [fetchData, urls.product],
  );

  const fetchUnpaginateProduct = useCallback(
    () => fetchData(urls.unpaginateProduct, "SET_API_UNPAGINATE_PRODUCT"),
    [fetchData, urls.unpaginateProduct],
  );

  // Contact Module
  const fetchContact = useCallback(
    () => fetchData(urls.contact, "SET_API_CONTACT"),
    [fetchData, urls.contact],
  );

  const fetchUnpaginateContact = useCallback(
    () => fetchData(urls.unpaginateContact, "SET_API_UNPAGINATE_CONTACT"),
    [fetchData, urls.unpaginateContact],
  );

  // Blog Module
  const fetchBlog = useCallback(
    () => fetchData(urls.blog, "SET_API_BLOG"),
    [fetchData, urls.blog],
  );

  const fetchUnpaginateBlog = useCallback(
    () => fetchData(urls.unpaginateBlog, "SET_API_UNPAGINATE_BLOG"),
    [fetchData, urls.unpaginateBlog],
  );

  // Settings Module
  const fetchClient = useCallback(
    () => fetchData(urls.client, "SET_API_CLIENT"),
    [fetchData, urls.client],
  );

  const fetchUnpaginateClient = useCallback(
    () => fetchData(urls.unpaginateClient, "SET_API_UNPAGINATE_CLIENT"),
    [fetchData, urls.unpaginateClient],
  );

  const fetchGeneralSettings = useCallback(
    () => fetchData(urls.generalSettings, "SET_API_GENERAL_SETTINGS"),
    [fetchData, urls.generalSettings],
  );

  const fetchUnpaginateGeneralSettings = useCallback(
    () =>
      fetchData(
        urls.unpaginateGeneralSettings,
        "SET_API_UNPAGINATE_GENERAL_SETTINGS",
      ),
    [fetchData, urls.unpaginateGeneralSettings],
  );

  // order & purchase module
  const fetchPurchase = useCallback(
    () => fetchData(urls.purchase, "SET_API_PURCHASE"),
    [fetchData, urls.purchase],
  );

  const fetchOrder = useCallback(
    () => fetchData(urls.order, "SET_API_ORDER"),
    [fetchData, urls.order],
  );

  // User / Customer module
  const fetchAllUsers = useCallback(
    () => fetchData(urls.allUsers, "SET_ALL_USERS"),
    [fetchData, urls.allUsers],
  );

  const fetchCurrentUser = useCallback(async () => {
    const aT = localStorage.getItem("humanhorizonAccessToken");
    if (aT) {
      try {
        const response = await fetch(urls.currentUser, {
          headers: {
            Authorization: `Bearer ${aT}`,
          },
        });
        const data = await response.json();
        dispatch({ type: "SET_CURRENT_USER_API", payload: data });
      } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch({ type: "API_ERROR" });
      }
    }
  }, [urls.currentUser]);

  // Fetch current user every time
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        fetchDistrict,
        fetchUpazila,

        fetchCategory,
        fetchUnpaginateCategory,
        fetchYear,
        fetchUnpaginateYear,
        fetchLicense,
        fetchUnpaginateLicense,

        fetchProduct,
        fetchUnpaginateProduct,

        fetchClient,
        fetchUnpaginateClient,
        fetchGeneralSettings,
        fetchUnpaginateGeneralSettings,

        fetchBlog,
        fetchUnpaginateBlog,

        fetchContact,
        fetchUnpaginateContact,

        fetchPurchase,
        fetchOrder,

        fetchAllUsers,
        fetchCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useProductContext = () => useContext(AppContext);
// const useApiContext = () => useContext(AppContext);

export { ProductContext, AppContext, useProductContext };

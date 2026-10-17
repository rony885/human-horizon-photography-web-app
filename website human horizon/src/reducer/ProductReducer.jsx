const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    // Address module
    case "SET_API_DISTRICT":
      return {
        ...state,
        isLoading: false,
        district: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_UPAZILA":
      return {
        ...state,
        isLoading: false,
        upazila: action.payload,
        isError: false,
      };

    // Product module
    case "SET_API_CATEGORY":
      return {
        ...state,
        isLoading: false,
        category: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_CATEGORY":
      return {
        ...state,
        isLoading: false,
        unpaginate_category: action.payload,
        isError: false,
      };

    case "SET_API_YEAR":
      return {
        ...state,
        isLoading: false,
        year: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_YEAR":
      return {
        ...state,
        isLoading: false,
        unpaginate_year: action.payload,
        isError: false,
      };

    case "SET_API_PRODUCT":
      return {
        ...state,
        isLoading: false,
        product: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_PRODUCT":
      return {
        ...state,
        isLoading: false,
        unpaginate_product: action.payload,
        isError: false,
      };

    //Contact Module
    case "SET_API_CONTACT":
      return {
        ...state,
        isLoading: false,
        contact: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_CONTACT":
      return {
        ...state,
        isLoading: false,
        unpaginate_contact: action.payload,
        isError: false,
      };

    //Settings Module
    case "SET_API_CLIENT":
      return {
        ...state,
        isLoading: false,
        client: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_CLIENT":
      return {
        ...state,
        isLoading: false,
        unpaginate_client: action.payload,
        isError: false,
      };

    case "SET_API_GENERAL_SETTINGS":
      return {
        ...state,
        isLoading: false,
        general_settings: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_GENERAL_SETTINGS":
      return {
        ...state,
        isLoading: false,
        unpaginate_general_settings: action.payload,
        isError: false,
      };

    // Blog Module
    case "SET_API_BLOG":
      return {
        ...state,
        isLoading: false,
        blog: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_BLOG":
      return {
        ...state,
        isLoading: false,
        unpaginate_blog: action.payload,
        isError: false,
      };

    // order & purchase module
    case "SET_API_PURCHASE":
      return {
        ...state,
        isLoading: false,
        purchase: action.payload,
        isError: false,
      };

    case "SET_API_ORDER":
      return {
        ...state,
        isLoading: false,
        order: action.payload,
        isError: false,
      };

    // User / Customer module
    case "SET_ALL_USERS":
      return {
        ...state,
        isLoading: false,
        all_users: action.payload,
        isError: false,
      };

    case "SET_CURRENT_USER_API":
      return {
        ...state,
        isLoading: false,
        c_user: action.payload,
        isError: false,
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default ProductReducer;

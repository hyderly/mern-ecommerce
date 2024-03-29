import {
  ProductActionTypes,
  ProductDeleteTypes,
  ProductCreateTypes,
  ProductUpdateTypes,
  ProductCreateReviewTypes,
  TopProductsTypes
} from "./product.types";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductActionTypes.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,

    
      };
    case ProductActionTypes.PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ProductDeleteTypes.PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case ProductDeleteTypes.PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ProductDeleteTypes.PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const productCreateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case ProductCreateTypes.PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ProductCreateTypes.PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case ProductCreateTypes.PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ProductCreateTypes.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case ProductUpdateTypes.PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case ProductUpdateTypes.PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        updatedProduct: action.payload,
      };
    case ProductUpdateTypes.PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ProductUpdateTypes.PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ProductCreateReviewTypes.PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case ProductCreateReviewTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ProductCreateReviewTypes.PRODUCT_CREATE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ProductCreateReviewTypes.PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};


export const productTopRatedReducer = (state = {products: []}, action) => {
  switch (action.type) {
    case TopProductsTypes.PRODUCT_TOP_REQUEST:
      return{
        loading: true,
        ...state
      }
    case TopProductsTypes.PRODUCT_TOP_SUCCESS:
      return {
        loading: false,
        products: action.payload
      }
    case TopProductsTypes.PRODUCT_TOP_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

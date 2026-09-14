import type { Attribute, Schema } from '@strapi/strapi';

export interface ProductFeature extends Schema.Component {
  collectionName: 'components_product_features';
  info: {
    description: 'Product feature item';
    displayName: 'Feature';
  };
  attributes: {
    description: Attribute.Text;
    title: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'product.feature': ProductFeature;
    }
  }
}

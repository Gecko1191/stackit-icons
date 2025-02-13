export type IconMetadata = {
  name: string;
  category: string;
  path: string;
  keywords: Array<string>;
};

export type IconCategories = Record<string, IconMetadata[]>;

/**
 * Groups all available icon metadata by category.
 * Categories and icons will be sorted alphabetically.
 */
export const groupIconsByCategory = (icons: Array<IconMetadata>) => {
  const categories = icons.reduce<IconCategories>((categories, icon) => {
    const { category, name } = icon;

    if (!categories[category]) {
      categories[category] = [];
    }

    categories[category].push(icon);

    return categories;
  }, {});

  const sortedCategories: typeof categories = {};

  Object.keys(categories)
    .sort()
    .forEach((category) => {
      const sortedMetadata = categories[category].slice().sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      sortedCategories[category] = sortedMetadata;
    });

  return sortedCategories;
};

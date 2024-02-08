import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { vars } from 'styles';

export const commonStyles = {
  mobileContainer: recipe({
    base: {
      maxWidth: 420,
      margin: 'auto',
      width: '100%',
    },
  }),
  fixedContainer: recipe({
    base: {
      position: 'fixed',
      padding: 24,
      backgroundColor: vars.color.backgroundScreen,
      borderWidth: 1,
      borderStyle: 'solid',
      bottom: 0,
      left: 0,
      right: 0,
      borderColor: vars.color.borderPrimary,
    },
  }),
};

export type MobileContainerVariantType = RecipeVariants<
  typeof commonStyles.mobileContainer
>;

export type FixedContainerVariantType = RecipeVariants<
  typeof commonStyles.fixedContainer
>;

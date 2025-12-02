# CouponDialog Component

## Overview

`CouponDialog.tsx` is a reusable dialog component for creating and editing coupons in the Platform Admin module.

## Features

### Dual Mode Support
- **Create Mode**: For creating new coupons
- **Edit Mode**: For editing existing coupons with pre-filled data

### Card-Style Type Selector
Replaced the traditional RadioGroup with visually appealing card-style selectors:

- **满减券 (Full Reduction)**: Orange theme - 满X元减Y元
- **折扣券 (Discount)**: Green theme - 打X折，最高Y元
- **立减券 (Instant Reduction)**: Blue theme - 直接减Y元

Each card shows:
- Border changes on selection (thick border + darker background)
- Hover effects for better UX
- Color-coded by coupon type

### Form Fields
- Coupon name (max 50 characters)
- Type selector (card-based)
- Type-specific fields (shown/hidden dynamically)
- Platform/Merchant cost sharing ratios
- Validity period (0 = permanent)
- Remarks (optional, max 200 characters)

### Props Interface

```typescript
interface CouponDialogProps {
  open: boolean                // Dialog open state
  onOpenChange: (open: boolean) => void  // Callback for state change
  coupon?: Coupon | null       // Coupon data for edit mode
  mode: 'create' | 'edit'      // Operating mode
}
```

## Usage

### In CouponListPage.tsx

```typescript
// State management
const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)

// Create Dialog
<CouponDialog
  open={isCreateDialogOpen}
  onOpenChange={setIsCreateDialogOpen}
  mode="create"
/>

// Edit Dialog
<CouponDialog
  open={isEditDialogOpen}
  onOpenChange={setIsEditDialogOpen}
  mode="edit"
  coupon={editingCoupon}
/>

// Edit handler
const handleEdit = (coupon: Coupon) => {
  setEditingCoupon(coupon)
  setIsEditDialogOpen(true)
}
```

## Form Submission

### Create Mode
- Form action: `/platform-admin/coupon-management/create`
- Redirects to: `/platform-admin/coupon-management/list`

### Edit Mode
- Form action: `/platform-admin/coupon-management/edit/${coupon.id}`
- Redirects to: `/platform-admin/coupon-management/list`
- Includes hidden `couponId` field

## Validation

Form validation is handled by:
1. Client-side: HTML5 validation (required, min, max)
2. Server-side: Route action validation (in create.tsx and edit.$id.tsx)

## Design System Compliance

Follows the Platform Admin UI guidelines:
- Brand blue (#3b82f6) for primary buttons
- Slate color palette for text and borders
- Consistent spacing and sizing (h-9 inputs, rounded-xl cards)
- Proper focus states with ring effects

## Files Modified

1. **Created**: `app/pages/PlatformAdmin/CouponManagement/components/CouponDialog.tsx`
2. **Updated**: `app/pages/PlatformAdmin/CouponManagement/CouponListPage.tsx`
   - Removed inline Dialog implementation
   - Added CouponDialog imports
   - Added edit dialog state management
   - Changed edit button from Link to onClick handler
3. **Updated**: `app/routes/platform-admin/coupon-management/edit.$id.tsx`
   - Removed loader function
   - Kept action function for form submission
   - Changed redirect to `/platform-admin/coupon-management/list`

## Benefits

1. **Code Reusability**: Single component handles both create and edit
2. **Maintainability**: Centralized form logic
3. **Better UX**: Card-style type selector is more intuitive
4. **Consistency**: Same UI for create and edit operations
5. **Simplified Routes**: Edit route no longer needs loader

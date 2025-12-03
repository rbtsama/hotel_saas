import { vitePlugin as remix } from "@remix-run/dev"
import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          // Root
          route("/", "routes/_index.tsx", { index: true })

          // Architecture Routes
          route("/architecture/product/overview", "routes/architecture/product/overview.tsx")
          route("/architecture/design/color-system", "routes/architecture/design/color-system.tsx")
          route("/architecture/design/color-system-2", "routes/architecture/design/color-system-2.tsx")
          route("/architecture/technical", "routes/architecture/technical/_index.tsx")
          route("/architecture/scenario", "routes/architecture/scenario/_index.tsx")
          route("/architecture/scenario/:id", "routes/architecture/scenario/$id.tsx")

          // Points System Routes
          route("/points-system/rule-config", "routes/points-system/rule-config.tsx")
          route("/points-system/user-account", "routes/points-system/user-account.tsx")

          // Account Management Routes
          route("/account/list", "routes/account/list.tsx")

          // Hotel Management Routes
          route("/hotel/join-application", "routes/hotel/join-application.tsx")
          route("/hotel/partner-list", "routes/hotel/partner-list.tsx")
          route("/hotel/contract-template", "routes/hotel/contract-template.tsx")
          route("/hotel/signing-record", "routes/hotel/signing-record.tsx")
          route("/hotel/onboarding", "routes/hotel/onboarding.tsx")


          // Order Management Routes
          route("/order/list", "routes/order/list.tsx")
          route("/order/:orderId", "routes/order/$orderId.tsx")
          route("/order/refund", "routes/order/refund.tsx")

          // Marketing Management Routes
          route("/marketing/ads", "routes/marketing/ads.tsx")

          // Dispute Management Routes
          route("/dispute/refund-requests", "routes/dispute/refund-requests.tsx")
          route("/dispute/refund-requests/:id", "routes/dispute/refund-request-detail.tsx")

          // Platform Admin - Index
          route("/platform-admin", "routes/platform-admin/_index.tsx", { index: true })

          // Platform Admin - Hotel Monitoring
          route("/platform-admin/hotel-monitor", "routes/platform-admin/hotel-monitor.tsx")
          route("/platform-admin/hotel/room-status", "routes/platform-admin/hotel/room-status.tsx")
          route("/platform-admin/hotel/reservations", "routes/platform-admin/hotel/reservations.tsx")
          route("/platform-admin/hotel/pricing", "routes/platform-admin/hotel/pricing.tsx")
          route("/platform-admin/hotel/check-in", "routes/platform-admin/hotel/check-in.tsx")
          route("/platform-admin/hotel/rooms", "routes/platform-admin/hotel/rooms.tsx")

          // Platform Admin - Points Management (New)
          route("/platform-admin/points-management/services", "routes/platform-admin/points-management/services.tsx")
          route("/platform-admin/points-management/config", "routes/platform-admin/points-management/config.tsx")
          route("/platform-admin/points-management/adjust", "routes/platform-admin/points-management/adjust.tsx")
          route("/platform-admin/points-management/operation-logs", "routes/platform-admin/points-management/operation-logs.tsx")


          // Platform Admin - User Management
          route("/platform-admin/user-management/list", "routes/platform-admin/user-management/list.tsx")
          route("/platform-admin/user-management/detail/:userId", "routes/platform-admin/user-management/detail.$userId.tsx")

          // Platform Admin - Member Management
          route("/platform-admin/member-management/members", "routes/platform-admin/member-management/members.tsx")

          // Platform Admin - Coupon Management
          route("/platform-admin/coupon-management/list", "routes/platform-admin/coupon-management/list.tsx")
          route("/platform-admin/coupon-management/create", "routes/platform-admin/coupon-management/create.tsx")
          route("/platform-admin/coupon-management/edit/:id", "routes/platform-admin/coupon-management/edit.$id.tsx")
          route("/platform-admin/coupon-management/toggle/:id", "routes/platform-admin/coupon-management/toggle.$id.tsx")
          route("/platform-admin/coupon-management/delete/:id", "routes/platform-admin/coupon-management/delete.$id.tsx")
          route("/platform-admin/coupon-management/issue", "routes/platform-admin/coupon-management/issue.tsx")
          route("/platform-admin/coupon-management/operation-logs", "routes/platform-admin/coupon-management/operation-logs.tsx")
          route("/platform-admin/coupon-management/issue-records", "routes/platform-admin/coupon-management/issue-records.tsx")

          // System Settings Routes
          route("/system/agreements", "routes/system/agreements.tsx")
          route("/system/tags", "routes/system/tags.tsx")

          // User Management Routes
          route("/user/list", "routes/user/list.tsx")
          route("/user/detail/:userId", "routes/user/detail.$userId.tsx")

          // Wechat Miniprogram Routes
          route("/wechat-miniprogram", "routes/wechat-miniprogram/_index.tsx")
          route("/hotel-backend/dashboard", "routes/hotel-backend/dashboard.tsx")

          // Hotel Backend Routes
          route("/hotel-backend/staff", "routes/hotel-backend/staff.tsx")
          route("/hotel-backend/store/basic-info", "routes/hotel-backend/store.basic-info.tsx")
          route("/hotel-backend/store/policy", "routes/hotel-backend/store.policy.tsx")
          route("/hotel-backend/store/facilities", "routes/hotel-backend/store.facilities.tsx")
          route("/hotel-backend/store/surrounding", "routes/hotel-backend/store.surrounding.tsx")
          route("/hotel-backend/store/breakfast", "routes/hotel-backend/store.breakfast.tsx")
          route("/hotel-backend/store/extra-bed", "routes/hotel-backend/store.extra-bed.tsx")
          route("/hotel-backend/store/images", "routes/hotel-backend/store.images.tsx")
          route("/hotel-backend/room-type-list", "routes/hotel-backend/room-type-list.tsx")
          route("/hotel-backend/room-type-images", "routes/hotel-backend/room-type-images/_index.tsx")
          route("/hotel-backend/non-room-products", "routes/hotel-backend/non-room-products/_index.tsx")
          route("/hotel-backend/pms-integration", "routes/hotel-backend/pms-integration/_index.tsx")
          route("/hotel-backend/room-price-calendar", "routes/hotel-backend/room-price-calendar/_index.tsx")
          route("/hotel-backend/inventory-calendar", "routes/hotel-backend/inventory-calendar/_index.tsx")
          route("/hotel-backend/order-calendar", "routes/hotel-backend/order-calendar/_index.tsx")
          route("/hotel-backend/order-list", "routes/hotel-backend/order-list/_index.tsx")
          route("/hotel-backend/order-list/:id", "routes/hotel-backend/order-list/$id.tsx")
          route("/hotel-backend/refund-management", "routes/hotel-backend/refund-management/_index.tsx")
          route("/hotel-backend/refund-management/:id", "routes/hotel-backend/refund-management/$id.tsx")
          route("/hotel-backend/user-reviews", "routes/hotel-backend/user-reviews/_index.tsx")
          route("/hotel-backend/user-reviews/:id", "routes/hotel-backend/user-reviews.$id.tsx")
          route("/hotel-backend/rooms", "routes/hotel-backend/rooms.tsx")
          route("/hotel-backend/members", "routes/hotel-backend/members.tsx")
          route("/hotel-backend/member-invitation", "routes/hotel-backend/member-invitation.tsx")
          route("/hotel-backend/store/benefits", "routes/hotel-backend/store.benefits.tsx")
          route("/hotel-backend/business/overview", "routes/hotel-backend/business.overview.tsx")
          route("/hotel-backend/business/statistics", "routes/hotel-backend/business.statistics.tsx")
          route("/hotel-backend/business/financial-statements", "routes/hotel-backend/business.financial-statements.tsx")
          route("/hotel-backend/business/settlements", "routes/hotel-backend/business.settlements.tsx")

          // Merchant Backend - New Modules
          route("/merchant-backend/join-application/apply", "routes/merchant-backend/join-application/apply.tsx")
          route("/merchant-backend/points-service/config", "routes/merchant-backend/points-service/config.tsx")
          route("/merchant-backend/vip-discount/config", "routes/merchant-backend/vip-discount/config.tsx")
          route("/merchant-backend/agent-order/create", "routes/merchant-backend/agent-order/create.tsx")
          route("/merchant-backend/old-customer/invite-member", "routes/merchant-backend/old-customer/invite-member.tsx")

          // Merchant Backend - Store Info
          route("/merchant-backend/store-info", "routes/merchant-backend/store-info/_index.tsx", { index: true })
          route("/merchant-backend/store-info/basic", "routes/merchant-backend/store-info/basic.tsx")
          route("/merchant-backend/store-info/policy", "routes/merchant-backend/store-info/policy.tsx")
          route("/merchant-backend/store-info/facilities", "routes/merchant-backend/store-info/facilities.tsx")
          route("/merchant-backend/store-info/surrounding", "routes/merchant-backend/store-info/surrounding.tsx")
          route("/merchant-backend/store-info/breakfast", "routes/merchant-backend/store-info/breakfast.tsx")
          route("/merchant-backend/store-info/extra-bed", "routes/merchant-backend/store-info/extra-bed.tsx")
          route("/merchant-backend/store-info/images", "routes/merchant-backend/store-info/images.tsx")

          // C Client - User Center
          route("/c-client/user-center/my-points", "routes/c-client/user-center/my-points.tsx")
          route("/c-client/user-center/member-center", "routes/c-client/user-center/member-center.tsx")
          route("/c-client/user-center/invite-friend", "routes/c-client/user-center/invite-friend.tsx")

          // C Client - Hotel
          route("/c-client/hotel/list", "routes/c-client/hotel/list.tsx")
          route("/c-client/hotel/detail", "routes/c-client/hotel/detail.tsx")
          route("/c-client/hotel/order-confirm", "routes/c-client/hotel/order-confirm.tsx")

          // C Client - Order
          route("/c-client/order/payment-success", "routes/c-client/order/payment-success.tsx")
          route("/c-client/order/list", "routes/c-client/order/list.tsx")
          route("/c-client/order/detail", "routes/c-client/order/detail.tsx")
        })
      },
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
})

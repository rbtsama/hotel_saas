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

          // Member System Routes
          route("/member/level-config", "routes/member/level-config.tsx")
          route("/member/invitation-config", "routes/member/invitation-config.tsx")
          route("/member/invitation-records", "routes/member/invitation-records.tsx")
          route("/member/friend-card-config", "routes/member/friend-card-config.tsx")
          route("/member/friend-card-records", "routes/member/friend-card-records.tsx")
          route("/member-management/levels", "routes/member-management/levels/_index.tsx")
          route("/member-management/members", "routes/member-management/members/_index.tsx")
          route("/member-management/members/:id", "routes/member-management/members.$id.tsx")

          // Coupon System Routes
          route("/coupon/config", "routes/coupon/config.tsx")
          route("/coupon/grant", "routes/coupon/grant.tsx")
          route("/coupon/verify", "routes/coupon/verify.tsx")

          // Order Management Routes
          route("/order/list", "routes/order/list.tsx")
          route("/order/detail", "routes/order/detail.tsx")
          route("/order/refund", "routes/order/refund.tsx")

          // Marketing Management Routes
          route("/marketing/ads", "routes/marketing/ads.tsx")

          // Dispute Management Routes
          route("/dispute/refund-requests", "routes/dispute/refund-requests.tsx")
          route("/dispute/arbitration-cases", "routes/dispute/arbitration-cases.tsx")
          route("/dispute/arbitrators", "routes/dispute/arbitrators.tsx")

          // Platform Admin - Hotel Monitoring
          route("/platform-admin/hotel-monitor", "routes/platform-admin/hotel-monitor.tsx")

          // Platform Admin - Points Management
          route("/platform-admin/points-management/base-rule", "routes/platform-admin/points-management/base-rule.tsx")
          route("/platform-admin/points-management/level-rates", "routes/platform-admin/points-management/level-rates.tsx")
          route("/platform-admin/points-management/statistics", "routes/platform-admin/points-management/statistics.tsx")

          // Platform Admin - Member Management
          route("/platform-admin/member-management/upgrade-rules", "routes/platform-admin/member-management/upgrade-rules.tsx")
          route("/platform-admin/member-management/discount-rules", "routes/platform-admin/member-management/discount-rules.tsx")
          route("/platform-admin/member-management/users", "routes/platform-admin/member-management/users.tsx")

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

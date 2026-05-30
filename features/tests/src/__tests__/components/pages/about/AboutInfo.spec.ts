import { describe, it, expect } from "vitest"
import AboutInfo from "@/components/pages/about/AboutInfo.vue"
import { mountWithPlugins } from "@/__tests__/utils"

describe("AboutInfo", () => {
  it("renders feature items", () => {
    const wrapper = mountWithPlugins(AboutInfo)
    expect(wrapper.text()).toContain("i18n Support")
    expect(wrapper.text()).toContain("Pinia Support")
    expect(wrapper.text()).toContain("Unit Tests (Vitest)")
    expect(wrapper.text()).not.toContain("Tailwind Support")
  })

  it("renders correct number of features", () => {
    const wrapper = mountWithPlugins(AboutInfo)
    const items = wrapper.findAll("view > view")
    expect(items).toHaveLength(3)
  })
})

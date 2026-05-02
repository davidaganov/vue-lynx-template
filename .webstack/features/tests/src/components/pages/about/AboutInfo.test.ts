import { describe, it, expect } from "vitest"
import AboutInfo from "@/components/pages/about/AboutInfo.vue"
import { mountWithPlugins } from "@/__tests__/utils"

describe("AboutInfo", () => {
  it("renders feature items", () => {
    const wrapper = mountWithPlugins(AboutInfo)
    expect(wrapper.text()).toContain("i18n Support")
    expect(wrapper.text()).toContain("Tailwind Support")
    expect(wrapper.text()).toContain("Unit Tests")
  })

  it("renders correct number of features", () => {
    const wrapper = mountWithPlugins(AboutInfo)
    const items = wrapper.findAll("view > view") // v-for items
    expect(items).toHaveLength(3)
  })
})

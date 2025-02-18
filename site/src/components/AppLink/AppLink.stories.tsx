import { Story } from "@storybook/react"
import {
  MockWorkspace,
  MockWorkspaceAgent,
  MockWorkspaceApp,
} from "testHelpers/renderHelpers"
import { AppLink, AppLinkProps } from "./AppLink"

export default {
  title: "components/AppLink",
  component: AppLink,
}

const Template: Story<AppLinkProps> = (args) => <AppLink {...args} />

export const WithIcon = Template.bind({})
WithIcon.args = {
  workspace: MockWorkspace,
  app: {
    ...MockWorkspaceApp,
    name: "code-server",
    icon: "/icon/code.svg",
    sharing_level: "owner",
    health: "healthy",
  },
  agent: MockWorkspaceAgent,
}

export const WithoutIcon = Template.bind({})
WithoutIcon.args = {
  workspace: MockWorkspace,
  app: {
    ...MockWorkspaceApp,
    name: "code-server",
    sharing_level: "owner",
    health: "healthy",
  },
  agent: MockWorkspaceAgent,
}

export const HealthDisabled = Template.bind({})
HealthDisabled.args = {
  workspace: MockWorkspace,
  app: {
    ...MockWorkspaceApp,
    name: "code-server",
    sharing_level: "owner",
    health: "disabled",
  },
  agent: MockWorkspaceAgent,
}

export const HealthInitializing = Template.bind({})
HealthInitializing.args = {
  workspace: MockWorkspace,
  app: {
    ...MockWorkspaceApp,
    name: "code-server",
    health: "initializing",
  },
  agent: MockWorkspaceAgent,
}

export const HealthUnhealthy = Template.bind({})
HealthUnhealthy.args = {
  workspace: MockWorkspace,
  app: {
    ...MockWorkspaceApp,
    name: "code-server",
    health: "unhealthy",
  },
  agent: MockWorkspaceAgent,
}

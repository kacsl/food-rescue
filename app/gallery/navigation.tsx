import { BreadcrumbItem, BREADCRUMB_STATES } from "@/components/ui/breadcrumb-item";
import { IconButton } from "@/components/ui/icon-button";
import { ListItem, LIST_ITEM_STATES } from "@/components/ui/list-item";
import { MenuItem, MENU_ITEM_STATES } from "@/components/ui/menu-item";
import { PageNumber, PAGE_NUMBER_STATES } from "@/components/ui/page-number";
import { Step, STEP_STATUSES } from "@/components/ui/step";
import { TreeItem, TREE_STATES } from "@/components/ui/tree-item";
import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";
import { Section, StateRow } from "./section";

export function NavigationSections() {
  return (
    <>
      <Section title="25" heading="Menu Item">
        {MENU_ITEM_STATES.map((state) => (
          <StateRow key={state} label={state}>
            <div style={{ width: "var(--size-dialog-sm)" }}>
              <MenuItem state={state} showShortcut shortcut="⌘R" />
            </div>
          </StateRow>
        ))}
        <StateRow label="Checked / Submenu">
          <div style={{ width: "var(--size-dialog-sm)" }}>
            <MenuItem checked label="Show sidebar" />
            <MenuItem submenu label="Move to" />
          </div>
        </StateRow>
      </Section>
      <Section title="26" heading="List & Tree">
        {LIST_ITEM_STATES.map((state) => (
          <StateRow key={state} label={state}>
            <div style={{ width: "var(--size-dialog-sm)" }}>
              <ListItem state={state} lines="Two" />
            </div>
          </StateRow>
        ))}
        {TREE_STATES.map((state) => (
          <StateRow key={`tree-${state}`} label={`Tree ${state}`}>
            <div style={{ width: "var(--size-dialog-sm)" }}>
              <TreeItem state={state} expanded="True" />
              <TreeItem kind="Leaf" label="Q3 draft" />
            </div>
          </StateRow>
        ))}
      </Section>
      <Section title="27" heading="Breadcrumb">
        <StateRow label="Trail">
          <BreadcrumbItem label="Workspace" />
          <BreadcrumbItem label="Projects" />
          <BreadcrumbItem type="Current" label="Evolve" showSeparator={false} />
        </StateRow>
        {BREADCRUMB_STATES.map((state) => (
          <StateRow key={state} label={state}>
            <BreadcrumbItem state={state} />
          </StateRow>
        ))}
      </Section>
      <Section title="28" heading="Pagination">
        <StateRow label="Row">
          <IconButton variant="Ghost" size="SM" icon={<ChevronLeftIcon />} aria-label="Previous page" />
          <PageNumber label="1" />
          <PageNumber label="2" selected="True" />
          <PageNumber label="3" />
          <IconButton variant="Ghost" size="SM" icon={<ChevronRightIcon />} aria-label="Next page" />
        </StateRow>
        {PAGE_NUMBER_STATES.map((state) => (
          <StateRow key={state} label={state}>
            <PageNumber state={state} label="4" />
          </StateRow>
        ))}
      </Section>
      <Section title="29" heading="Step">
        <StateRow label="Statuses">
          {STEP_STATUSES.map((status, index) => (
            <Step key={status} status={status} title={status} index={String(index + 1)} showConnector={index < 2} />
          ))}
        </StateRow>
      </Section>
    </>
  );
}

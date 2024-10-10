import {
  AccordionContent,
  AccordionIcon,
  ChevronUpIcon,
} from "@gluestack-ui/themed";
import { ChevronDownIcon } from "@gluestack-ui/themed";
import { AccordionTitleText } from "@gluestack-ui/themed";
import {
  Accordion as AccordionComponent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@gluestack-ui/themed";

type AccordionItemProps = {
  id: string;
  text: string;
  content: React.ReactNode;
};

type AccordionProps = {
  list: AccordionItemProps[];
};

const AccordionListItem = ({ item }: { item: AccordionItemProps }) => (
  <AccordionItem value={item.id}>
    <AccordionHeader>
      <AccordionTrigger paddingVertical={0} paddingHorizontal={0}>
        {({ isExpanded }) => (
          <AccordionTriggerContent text={item.text} isExpanded={isExpanded} />
        )}
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent paddingVertical={0} paddingHorizontal={0} paddingTop={16}>
      {item.content}
    </AccordionContent>
  </AccordionItem>
);

const AccordionTriggerContent = ({
  text,
  isExpanded,
}: {
  text: string;
  isExpanded: boolean;
}) => (
  <>
    <AccordionTitleText fontWeight={500} fontSize={18}>
      {text}
    </AccordionTitleText>
    <AccordionIcon as={isExpanded ? ChevronUpIcon : ChevronDownIcon} />
  </>
);

export const Accordion = ({ list }: AccordionProps) => (
  <AccordionComponent
    variant="unfilled"
    type="single"
    isCollapsible={true}
    isDisabled={false}
  >
    {list.map((item) => (
      <AccordionListItem key={item.id} item={item} />
    ))}
  </AccordionComponent>
);

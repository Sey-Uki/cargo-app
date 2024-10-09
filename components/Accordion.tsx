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

type AccordionProps = {
  list: {
    id: string;
    text: string;
    content: React.JSX.Element;
  }[];
};

export const Accordion = ({ list }: AccordionProps) => {
  return (
    <AccordionComponent
      variant="unfilled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
    >
      {list.map((item) => {
        return (
          <AccordionItem value={item.id}>
            <AccordionHeader>
              <AccordionTrigger paddingVertical={0} paddingHorizontal={0}>
                {({ isExpanded }) => {
                  return (
                    <>
                      <AccordionTitleText fontWeight={500} fontSize={18}>
                        {item.text}
                      </AccordionTitleText>
                      {isExpanded ? (
                        <AccordionIcon as={ChevronUpIcon} />
                      ) : (
                        <AccordionIcon as={ChevronDownIcon} />
                      )}
                    </>
                  );
                }}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent
              paddingVertical={0}
              paddingHorizontal={0}
              paddingTop={16}
            >
              {item.content}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </AccordionComponent>
  );
};

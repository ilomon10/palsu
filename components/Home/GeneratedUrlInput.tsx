import {
  Box,
  TextInput,
  ActionIcon,
  Tooltip,
  TypographyStylesProvider,
  Title,
  Text,
} from "@mantine/core";
import { IconClipboard, IconInfoCircle } from "@tabler/icons";
import { useMemo, useRef } from "react";
import { iField, useClient } from "../client";
import { Flex } from "../Flex";

export const GeneratedUrlInput = ({
  fields,
  limit,
  seed,
}: {
  fields: iField[];
  limit: number | undefined;
  seed: string;
}) => {
  const textInputRef = useRef<HTMLInputElement>();
  const client = useClient();
  const generatedUrl = useMemo(() => {
    try {
      return client.url(fields, limit, seed).toString();
    } catch (err) {
      return "";
    }
  }, [seed, limit, fields]);

  return (
    <Box>
      <TextInput
        // @ts-ignore
        ref={textInputRef}
        readOnly={true}
        label={
          <Flex>
            <Box>Generated URL</Box>
            <Box ml="xs">
              <Tooltip
                wrapLines={true}
                width={250}
                label={
                  "You can get directly on your machine with this url endpoint in JSON format"
                }
                position="right"
                withArrow={true}
              >
                <ActionIcon size="xs">
                  <IconInfoCircle />
                </ActionIcon>
              </Tooltip>
            </Box>
          </Flex>
        }
        value={generatedUrl}
        rightSection={
          <Tooltip label="Copy">
            <ActionIcon variant="light">
              <IconClipboard />
            </ActionIcon>
          </Tooltip>
        }
      />
    </Box>
  );
};

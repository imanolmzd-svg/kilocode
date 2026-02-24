/**
 * Message component
 * Uses kilo-ui's Message component from @kilocode/kilo-ui/message-part
 * which handles all part types: text (Markdown), tool (BasicTool + per-tool renderers),
 * reasoning, and more — matching the desktop app's rendering.
 *
 * The DataProvider bridge in App.tsx provides the session store data in the
 * format that these components expect.
 */

import { Component, Show } from "solid-js"
import { Message as KiloMessage } from "@kilocode/kilo-ui/message-part"
import { Card } from "@kilocode/kilo-ui/card"
import { useSession } from "../../context/session"
import type { Message as MessageType, MessageError } from "../../types/messages"
import type { Message as SDKMessage, Part as SDKPart } from "@kilocode/sdk/v2"

interface MessageProps {
  message: MessageType
}

/**
 * Extract a user-friendly error message from the error payload.
 */
function getErrorText(error: MessageError): string {
  const data = error.data as Record<string, unknown>
  const msg = data?.message
  if (typeof msg === "string" && msg) return msg
  return error.name
}

export const Message: Component<MessageProps> = (props) => {
  const session = useSession()
  const parts = () => session.getParts(props.message.id) as unknown as SDKPart[]

  return (
    <Show when={parts().length > 0 || props.message.content || props.message.error}>
      <KiloMessage message={props.message as unknown as SDKMessage} parts={parts()} />
      <Show when={props.message.error}>
        <Card variant="error" class="error-card">
          {getErrorText(props.message.error!)}
        </Card>
      </Show>
    </Show>
  )
}

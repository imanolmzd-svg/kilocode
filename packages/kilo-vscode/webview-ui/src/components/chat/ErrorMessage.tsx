/**
 * ErrorMessage component
 * Renders a message-level error card using kilo-ui's Card component.
 * Mirrors the error rendering pattern from session-turn.tsx in the desktop app.
 */

import { Component } from "solid-js"
import { Card } from "@kilocode/kilo-ui/card"
import type { MessageError } from "../../types/messages"

interface ErrorMessageProps {
  error: MessageError
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

export const ErrorMessage: Component<ErrorMessageProps> = (props) => {
  return (
    <Card variant="error">
      {getErrorText(props.error)}
    </Card>
  )
}

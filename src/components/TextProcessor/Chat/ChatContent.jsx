/* eslint-disable react/prop-types */
import MessagesContainer from "../MessagesContainer";
import ErrorDisplay from "../ErrorDisplay";
import TextInput from "../TextInput";

const ChatContent = ({
  messages,
  onSummarize,
  onTranslate,
  loading,
  error,
  onDismissError,
  inputText,
  onInputChange,
  onSend,
  disabled,
}) => (
  <div className="flex flex-col h-screen pt-[73px] pb-[100px] md:ml-[var(--sidebar-width)] transition-all duration-300">
    <div className="flex-1 overflow-y-auto">
      <MessagesContainer
        messages={messages}
        onSummarize={onSummarize}
        onTranslate={onTranslate}
        loading={loading}
      />
    </div>

    <div className="px-4 max-w-3xl w-full mx-auto">
      <ErrorDisplay error={error} onDismiss={onDismissError} />
    </div>

    <div className="fixed bottom-0 right-0 left-0 md:left-[var(--sidebar-width)] p-4 bg-white border-t transition-all duration-300">
      <div className="max-w-3xl w-full mx-auto">
        <TextInput
          value={inputText}
          onChange={onInputChange}
          onSend={onSend}
          loading={loading}
          disabled={disabled}
        />
      </div>
    </div>
  </div>
);

export default ChatContent;

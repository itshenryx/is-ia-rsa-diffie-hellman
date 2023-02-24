import * as Popover from "@radix-ui/react-popover";
import './info.css';

const Info = ({content}) => {
    return (
        <Popover.Root>
            <Popover.Trigger className="info-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                     className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                </svg>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="info-content " sideOffset={5}>
                    <p>
                        {content}
                    </p>
                    <Popover.Arrow className="info-arrow"/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default Info;
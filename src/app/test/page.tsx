import Modal from "@/components/meta/modal"
import { Button } from "@/components/ui/button"

export default function ExamplePage() {
  return (
    <div>
      <h1>Example Page</h1>
      
      {/* Simple usage */}
      <Modal
        trigger={<Button>Open Modal</Button>}
        title="Simple Modal"
      >
        <div className="p-6">
          <p>This is a simple modal with static content.</p>
        </div>
      </Modal>


      {/* Modal that's open by default */}
      <Modal
        defaultOpen={true}
        title="Welcome"
        variant="default"
      >
        <p>This modal is open by default when the page loads.</p>
      </Modal>
    </div>
  )
}
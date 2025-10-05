import ValidationIndicator from "../ValidationIndicator";

export default function ValidationIndicatorExample() {
  return (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Valid Color</h3>
        <ValidationIndicator 
          isWebSafe={true}
          isSystemColor={true}
          hasValidFormat={true}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Partial Validation</h3>
        <ValidationIndicator 
          isWebSafe={false}
          isSystemColor={true}
          hasValidFormat={true}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Invalid Format</h3>
        <ValidationIndicator 
          isWebSafe={false}
          isSystemColor={false}
          hasValidFormat={false}
        />
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Phone, Hammer, Check, X, Upload, Image as ImageIcon, Trash2, Mail, MessageSquare } from 'lucide-react';

interface IntakeFormProps {
  onCancel: () => void;
}

const IntakeForm: React.FC<IntakeFormProps> = ({ onCancel }) => {
  const [clientId, setClientId] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    contactPreference: [] as string[],
    contactTime: 'Morning (8am - 12pm)',
    scope: '',
    materials: '',
    specialConsiderations: [] as string[]
  });

  useEffect(() => {
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    setClientId(`HOTS-${randomStr}`);
  }, []);

  const considerations = [
    "Moving Furniture",
    "Pets in home",
    "Dust Sensitive",
    "Parking Restrictions",
    "High Ceilings (>10ft)",
    "Historic Home"
  ];

  const generateAIPrompt = () => {
    return `
*** HANDY ON THE SPOT ESTIMATION REQUEST ***
CLIENT ID: ${clientId}
LOCATION: ${formData.address}

SCOPE OF WORK:
"${formData.scope}"

MATERIALS NEEDED:
"${formData.materials || 'None specified'}"

SPECIAL CONSIDERATIONS:
${formData.specialConsiderations.length > 0 ? formData.specialConsiderations.join(', ') : 'None'}

UPLOADED FILES:
${files.length > 0 ? files.map(f => `- ${f.name}`).join('\n') : 'No images uploaded'}

---
TASK FOR AI:
Act as a Senior Construction Estimator. Based on the scope above:
1. Break down the labor hours required for each step.
2. List specific materials needed and estimated costs (Home Depot pricing).
3. Provide a low-end and high-end total project estimate.
`;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleConsideration = (item: string) => {
    setFormData(prev => {
      const current = prev.specialConsiderations;
      if (current.includes(item)) {
        return { ...prev, specialConsiderations: current.filter(i => i !== item) };
      }
      return { ...prev, specialConsiderations: [...current, item] };
    });
  };

  const toggleContactPreference = (item: string) => {
    setFormData(prev => {
      const current = prev.contactPreference;
      if (current.includes(item)) {
        return { ...prev, contactPreference: current.filter(i => i !== item) };
      }
      return { ...prev, contactPreference: [...current, item] };
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('_subject', `New Estimate Request: ${clientId}`);
    formDataToSend.append('_captcha', 'false');
    formDataToSend.append('Client ID', clientId);
    formDataToSend.append('Name', `${formData.firstName} ${formData.lastName}`);
    formDataToSend.append('Email', formData.email);
    formDataToSend.append('Phone', formData.phone);
    formDataToSend.append('Contact Preference', formData.contactPreference.length > 0 ? formData.contactPreference.join(', ') : 'Not specified');
    formDataToSend.append('Address', formData.address);
    formDataToSend.append('AI_PROMPT_DATA', generateAIPrompt());

    files.forEach((file) => {
      formDataToSend.append('attachment', file);
    });

    try {
      const response = await fetch('https://formsubmit.co/bringhomethebacon20895@gmail.com', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      alert('There was an error submitting your request. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-premium-lg w-full max-w-lg p-10 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-premium">
            <Check className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Request Received!</h2>
          <p className="text-lg text-slate-600 mb-3 leading-relaxed">
            Your reference ID is <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded">{clientId}</span>
          </p>
          <p className="text-slate-500 mb-8 leading-relaxed">
            We have received your details and photos. We will contact you at your preferred time with a guaranteed quote.
          </p>
          <button onClick={onCancel} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
            Close & Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-premium-lg w-full max-w-2xl overflow-hidden relative">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Hammer className="h-6 w-6 text-orange-500" />
                Project Intake
              </h2>
              <span className="bg-slate-700/50 text-orange-400 text-xs font-mono py-1.5 px-3 rounded-lg border border-slate-600/50 backdrop-blur-sm">
                ID: {clientId}
              </span>
            </div>
            <p className="text-slate-300 text-base">Tell us about your project</p>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="h-1.5 bg-slate-100 w-full">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 ease-out"
            style={{ width: formStep === 1 ? '50%' : '100%' }}
          ></div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 max-h-[80vh] overflow-y-auto">
          {formStep === 1 && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 border-b-2 border-slate-200 pb-3">Client Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="Jane" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Service Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <input required name="address" value={formData.address} onChange={handleChange} className="w-full pl-12 p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="123 Main St, City, Zip" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                   <div className="relative">
                    <Phone className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-12 p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="(555) 123-4567" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                   <div className="relative">
                    <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-12 p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="your@email.com" />
                   </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Preferred Contact Method</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Email', 'Text', 'Both'].map((method) => (
                    <div
                      key={method}
                      onClick={() => toggleContactPreference(method)}
                      className={`cursor-pointer p-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
                        ${formData.contactPreference.includes(method)
                          ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50/30'}`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                        ${formData.contactPreference.includes(method) ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
                        {formData.contactPreference.includes(method) && <Check className="h-3.5 w-3.5 text-white" />}
                      </div>
                      <MessageSquare className="h-4 w-4" />
                      {method}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-2">Best Time to Contact</label>
                   <div className="relative">
                    <Clock className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <select name="contactTime" value={formData.contactTime} onChange={handleChange} className="w-full pl-12 p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white transition-all">
                      <option>Morning (8am - 12pm)</option>
                      <option>Afternoon (12pm - 4pm)</option>
                      <option>Evening (4pm - 8pm)</option>
                    </select>
                   </div>
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <button type="button" onClick={() => setFormStep(2)} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                  Next Step <Check className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {formStep === 2 && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 border-b-2 border-slate-200 pb-3">Project Details</h3>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Scope of Work</label>
                <textarea required name="scope" value={formData.scope} onChange={handleChange} rows={4} className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none" placeholder="Describe the job in detail..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Special Considerations</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {considerations.map((item) => (
                    <div
                      key={item}
                      onClick={() => toggleConsideration(item)}
                      className={`cursor-pointer p-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 flex items-center gap-2
                        ${formData.specialConsiderations.includes(item)
                          ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-orange-300 hover:bg-orange-50/30'}`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                        ${formData.specialConsiderations.includes(item) ? 'bg-orange-500 border-orange-500' : 'border-slate-300'}`}>
                        {formData.specialConsiderations.includes(item) && <Check className="h-3.5 w-3.5 text-white" />}
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Picture Portal</label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 hover:bg-slate-50 hover:border-slate-400 transition-all text-center group relative">
                   <input
                      type="file"
                      multiple
                      accept="image/*"
                      name="attachment"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                   />
                   <div className="flex flex-col items-center gap-3 pointer-events-none">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-2xl group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm">
                        <Upload className="h-7 w-7 text-blue-600" />
                      </div>
                      <p className="text-base font-semibold text-slate-700">Click to Upload Project Photos</p>
                      <p className="text-sm text-slate-500">JPG, PNG (Max 5MB)</p>
                   </div>
                </div>
                {files.length > 0 && (
                  <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {files.map((file, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden border-2 border-slate-200 aspect-square bg-slate-50">
                        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                          <ImageIcon className="h-10 w-10 text-slate-400 mb-2" />
                          <span className="text-xs text-slate-500 break-all leading-tight font-medium">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Materials Needed <span className="text-slate-400 font-normal">(Optional)</span></label>
                <textarea name="materials" value={formData.materials} onChange={handleChange} rows={2} className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none" placeholder="E.g. I have the paint already..." />
              </div>
              <div className="pt-6 flex justify-between items-center">
                <button type="button" onClick={() => setFormStep(1)} className="text-slate-500 hover:text-slate-800 font-semibold px-6 py-3 hover:bg-slate-100 rounded-xl transition-all">
                  Back
                </button>
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-orange-glow hover:-translate-y-0.5">
                  Submit Request
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default IntakeForm;
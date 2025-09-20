'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMiniKit } from '@coinbase/minikit';
import { createUserAccount } from '@/lib/auth';
import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, User, Briefcase, Target } from 'lucide-react';

const roles = [
  'Project Manager',
  'Developer',
  'Designer',
  'Team Lead',
  'Team Member',
  'Consultant'
];

const skills = [
  'Leadership', 'Planning', 'Communication',
  'React', 'TypeScript', 'Node.js', 'Python',
  'UI/UX', 'Figma', 'Prototyping',
  'Project Management', 'Agile', 'Scrum',
  'Data Analysis', 'Analytics', 'Reporting'
];

export default function OnboardingPage() {
  const { context } = useMiniKit();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    skills: [] as string[]
  });

  useEffect(() => {
    if (context?.user?.displayName) {
      setFormData(prev => ({
        ...prev,
        name: context.user.displayName
      }));
    }
  }, [context]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!context?.user?.fid) return;

    setIsLoading(true);
    try {
      await createUserAccount(
        context.user.fid.toString(),
        formData.name,
        context.user.pfpUrl
      );

      // Update user with role and skills
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farcasterId: context.user.fid.toString(),
          name: formData.name,
          role: formData.role,
          skills: formData.skills
        })
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Onboarding failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-dashboard-bg to-dashboard-card flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to FlowMetric</CardTitle>
            <CardDescription>
              Let's set up your profile to get the most out of your productivity insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Progress Indicator */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNumber
                        ? 'bg-dashboard-accent text-white'
                        : 'bg-dashboard-surface text-dashboard-textSecondary'
                    }`}>
                      {step > stepNumber ? <CheckCircle className="w-4 h-4" /> : stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div className={`w-12 h-0.5 mx-2 ${
                        step > stepNumber ? 'bg-dashboard-accent' : 'bg-dashboard-surface'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <User className="w-12 h-12 mx-auto mb-4 text-dashboard-accent" />
                    <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
                    <p className="text-dashboard-textSecondary">Tell us a bit about yourself</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 text-dashboard-accent" />
                    <h3 className="text-lg font-semibold mb-2">Skills & Expertise</h3>
                    <p className="text-dashboard-textSecondary">Select the skills that best describe your expertise</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {skills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`p-3 text-sm rounded-lg border transition-colors ${
                          formData.skills.includes(skill)
                            ? 'bg-dashboard-accent text-white border-dashboard-accent'
                            : 'bg-dashboard-surface text-dashboard-text border-dashboard-surface hover:border-dashboard-accent'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <Target className="w-12 h-12 mx-auto mb-4 text-dashboard-accent" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Get Started!</h3>
                    <p className="text-dashboard-textSecondary">Review your information and start using FlowMetric</p>
                  </div>

                  <div className="bg-dashboard-surface p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-dashboard-textSecondary">Name:</span>
                      <span className="text-dashboard-text">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dashboard-textSecondary">Role:</span>
                      <span className="text-dashboard-text">{formData.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dashboard-textSecondary">Skills:</span>
                      <span className="text-dashboard-text">
                        {formData.skills.length > 0 ? formData.skills.join(', ') : 'None selected'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={step === 1 && (!formData.name || !formData.role)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Setting up...' : 'Complete Setup'}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}


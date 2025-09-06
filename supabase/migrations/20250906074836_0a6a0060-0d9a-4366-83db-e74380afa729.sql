-- Create payments table for finances
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  student_name TEXT NOT NULL,
  class_name TEXT NOT NULL,
  type TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'En attente' CHECK (status IN ('Payé', 'En attente', 'En retard')),
  date DATE NOT NULL,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payment_types table
CREATE TABLE public.payment_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create grades table
CREATE TABLE public.grades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  student_name TEXT NOT NULL,
  subject_id UUID,
  subject_name TEXT NOT NULL,
  class_name TEXT NOT NULL,
  grade DECIMAL(4,2) NOT NULL CHECK (grade >= 0 AND grade <= 20),
  coefficient INTEGER NOT NULL DEFAULT 1,
  type TEXT NOT NULL DEFAULT 'DS' CHECK (type IN ('DS', 'Interrogation', 'Examen')),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create school_settings table
CREATE TABLE public.school_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  school_year TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'FCFA',
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  maintenance_mode BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create users table for user management
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL,
  permissions JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow all operations on payments" ON public.payments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on payment_types" ON public.payment_types FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on grades" ON public.grades FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on school_settings" ON public.school_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on users" ON public.users FOR ALL USING (true) WITH CHECK (true);

-- Create triggers for updated_at
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payment_types_updated_at BEFORE UPDATE ON public.payment_types FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON public.grades FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_school_settings_updated_at BEFORE UPDATE ON public.school_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default payment types
INSERT INTO public.payment_types (name, amount) VALUES 
('Frais de scolarité 1', 15000),
('Frais de scolarité 2', 15000),
('Frais de scolarité 3', 15000),
('Photocopie et anglais', 5000),
('Uniforme', 8000),
('Cantine', 12000),
('Activité', 3000);

-- Insert default school settings
INSERT INTO public.school_settings (name, type, school_year) VALUES 
('Complexe Scolaire La Roseraie', 'Primaire et Maternelle', '2023-2024');
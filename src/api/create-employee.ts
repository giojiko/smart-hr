import { createClient } from '@supabase/supabase-js'

export const config = { api: { bodyParser: true } }

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { employeeData, tempPassword } = req.body
  const supabaseUrl = process.env.SUPABASE_URL || ''
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  const resendKey = process.env.RESEND_API_KEY || ''

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Server configuration missing' })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: employeeData.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        first_name: employeeData.first_name,
        last_name: employeeData.last_name,
        force_password_change: true,
      }
    })
    if (authError) throw authError

    const { error: empError } = await supabase
      .from('employees')
      .insert([{
        ...employeeData,
        user_id: authUser.user.id,
        force_password_change: true,
        invitation_sent_at: new Date().toISOString(),
      }])
    if (empError) throw empError

    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Smart HR <hr@smartpro.ge>',
          to: employeeData.email,
          subject: 'Smart HR — თქვენი ანგარიში გააქტიურდა',
          html: `
            <div style="font-family: Arial; max-width: 500px; margin: 0 auto;">
              <div style="background: #0A1628; padding: 24px; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0;">Smart <span style="color: #1E5CDB;">HR</span></h1>
              </div>
              <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 12px 12px;">
                <h2 style="color: #0A1628;">გამარჯობა, ${employeeData.first_name}!</h2>
                <p style="color: #64748b;">თქვენი Smart HR ანგარიში გააქტიურდა.</p>
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
                  <p style="margin: 0 0 8px; color: #64748b; font-size: 14px;">ელ-ფოსტა:</p>
                  <p style="margin: 0 0 16px; font-weight: bold; color: #0A1628;">${employeeData.email}</p>
                  <p style="margin: 0 0 8px; color: #64748b; font-size: 14px;">დროებითი პაროლი:</p>
                  <p style="margin: 0; font-size: 28px; font-weight: bold; color: #1E5CDB; letter-spacing: 3px;">${tempPassword}</p>
                </div>
                <p style="color: #ef4444; font-size: 14px;">⚠️ პირველი შესვლისას მოგეთხოვებათ პაროლის შეცვლა.</p>
                <a href="https://hr.smartpro.ge/login"
                  style="display: inline-block; background: #1E5CDB; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px;">
                  პლატფორმაზე შესვლა →
                </a>
              </div>
            </div>
          `
        })
      })
    }

    return res.status(200).json({ success: true })

  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.UTILS
{
    public class MultiKey
    {
        private readonly List<object> _parts;

        public MultiKey(params object[] parts)
        {
            _parts = new List<object>(parts);
        }

        public override int GetHashCode()
        {
            var hash = 0;
            if (_parts.Count > 0)
                unchecked
                {
                    hash = 17;
                    _parts.Where(p => null != p).ToList().ForEach(p => { hash = hash * 31 + p.GetHashCode(); });
                }

            return hash;
        }

        public override bool Equals(object obj)
        {
            if (null != obj && obj is MultiKey key)
            {
                if (key._parts.Count != _parts.Count) return false;
                for (var i = 0; i < _parts.Count; i++)
                    if (!Equals(_parts[i], key._parts[i]))
                        return false;

                return true;
            }

            return false;
        }
    }
}
